import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, lastValueFrom, map, take } from 'rxjs';
import { CreatorForm } from 'src/app/components/creator-page/creator-page.component';
import { Movement } from 'src/app/models/MovementModel';
import { TemplateCreationParams } from 'src/app/models/TemplateModel';
import { TemplatesService } from 'src/app/services/templates.service';

/**
 * Handles State for the whole CreateTemplate page component tree.
 */
export class CreateTemplateComponentState {
  /**
   * Stores the movements selected to be included in a Template.
   */
  private movementsSubject: BehaviorSubject<Movement[]> = new BehaviorSubject<Movement[]>([]);

  /**
   * Gets the list of selected Movements to be included in the new Template
   *
   * @returns Observable instance
   */
  getMovements(): Observable<Movement[]> {
    return this.movementsSubject.asObservable();
  }

  /**
   * Adds Movements into the list of selected Movements.
   *
   * @param movement Movement reference
   */
  addMovements(...movements: Movement[]) {
    const currentMovements = this.movementsSubject.value;

    for (let movement of movements) {
      if (currentMovements.find(m => m.id === movement.id)) {
        continue;
      }

      currentMovements.push(movement);
    }

    this.movementsSubject.next(currentMovements);
  }

  /**
   * Deletes a Movement from the selected list.
   *
   * @param movement Movement reference
   */
  removeMovement(movement: Movement) {
    const currentMovements = this.movementsSubject.value;

    const newArray = currentMovements.filter(m => m.id !== movement.id);

    this.movementsSubject.next(newArray);
  }

  /**
   * Repositions a Movement in the state's list. Useful to reorder the list of movements.
   *
   * @param originalIndex Index of the Movement to be moved
   * @param newIndex Index in which the movement will be placed
   */
  moveMovement(originalIndex: number, newIndex: number) {
    const movements = this.movementsSubject.value;

    moveItemInArray(movements, originalIndex, newIndex);

    this.movementsSubject.next(movements);
  }
}

@Component({
  selector: 'app-create-template',
  templateUrl: './create-template.component.html',
  styleUrls: ['./create-template.component.sass'],
  providers: [CreateTemplateComponentState],
})
export class CreateTemplateComponent {
  state: CreateTemplateComponentState = inject(CreateTemplateComponentState);
  templatesService: TemplatesService = inject(TemplatesService);
  router: Router = inject(Router);

  /**
   * Form tha stores the data for the new Template.
   */
  templateForm: CreatorForm = new FormGroup({
    title: new FormControl<string | null>(null, { validators: Validators.required }),
    description: new FormControl<string | null>(null, { validators: Validators.required }),
  });

  /**
   * Tries to create a new Template.
   */
  async createTemplate() {
    if (!this.templateForm.get('title')?.valid) {
      alert('You have missing information');
      return;
    }

    this.state
      .getMovements()
      .pipe(
        take(1),
        map(movements => movements.map(m => m.id)),
      )
      .subscribe(ids => {
        const template: TemplateCreationParams = {
          name: this.templateForm.value.title!,
          description: this.templateForm.value.description! ?? undefined,
        };

        this.templatesService.createTemplate(template, ids).subscribe({
          next: template => {
            alert(`Template ${template.name} successfully created!`);
            this.router.navigate(['/templates']);
          },
          error: err => {
            alert(err.message);
          },
        });
      });
  }

  /**
   * Takes in the form from the CreatorPage component and stores its reference to use in this
   * component.
   *
   * @param form CreatorPage form
   */
  handleFormChanged(form: CreatorForm) {
    this.templateForm = form;
  }
}
