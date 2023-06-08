import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, of, switchMap, take } from 'rxjs';
import { CreatorPageState } from 'src/app/components/creator-page/creator-page.component';
import { Movement } from 'src/app/models/MovementModel';
import { TemplateCreationParams, TemplateUpdateParams } from 'src/app/models/TemplateModel';
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
  providers: [CreateTemplateComponentState, CreatorPageState],
})
export class CreateTemplateComponent implements OnInit {
  state: CreateTemplateComponentState = inject(CreateTemplateComponentState);
  templatesService: TemplatesService = inject(TemplatesService);
  router: Router = inject(Router);
  location: Location = inject(Location);
  route: ActivatedRoute = inject(ActivatedRoute);
  creatorPageState: CreatorPageState = inject(CreatorPageState);

  ngOnInit(): void {
    const inUpdatePath: boolean = this.router.url.includes('/templates/update/');

    if (inUpdatePath) {
      this.route.paramMap
        .pipe(
          take(1),
          switchMap(paramMap => {
            let id: number = parseInt(paramMap.get('id')!);

            if (Number.isNaN(id) || !inUpdatePath) {
              return of(null);
            }

            return this.templatesService.getTemplate(id);
          }),
          catchError(_ => {
            this.location.back();
            return of(null);
          }),
        )
        .subscribe(template => {
          if (!template) {
            this.location.back();
            return;
          }

          this.state.addMovements(...(template.movements?.flatMap(m => m.movement!) ?? []));

          this.creatorPageState.setFormValues({
            title: template.name,
            description: template.description ?? '',
          });

          this.creatorPageState.updateState = {
            isUpdate: true,
            objectId: template.id,
          };
        });
    }
  }

  /**
   * Tries to create a new Template.
   */
  async createTemplate() {
    if (!this.creatorPageState.isFormValid()) {
      alert('You have missing information');
      return;
    }

    this.getMovementsIds(this.state.getMovements()).subscribe(ids => {
      const formValues = this.creatorPageState.getFormValues();

      const template: TemplateCreationParams = {
        name: formValues.title!,
        description: formValues.description,
      };

      this.templatesService.createTemplate(template, ids).subscribe({
        next: template => {
          alert(`Template ${template.name} successfully created!`);
          this.location.back();
        },
        error: err => {
          alert(err.message);
        },
      });
    });
  }

  /**
   * Updates the current Template, only if an update operation is being made.
   *
   * @param templateId Identifier for the template to be updated
   */
  async updateTemplate(templateId: number) {
    if (!this.creatorPageState.isFormValid()) {
      alert('You have missing information');
      return;
    }
    this.getMovementsIds(this.state.getMovements()).subscribe(ids => {
      const formValues = this.creatorPageState.getFormValues();
      const data: TemplateUpdateParams = {
        name: formValues.title!,
        description: formValues.description!,
      };
      this.templatesService.updateTemplate(templateId, data, ids).subscribe({
        next: template => {
          alert(template.name + ' successfully updated!');
          this.location.back();
        },
        error: err => {
          alert(err.message);
        },
      });
    });
  }

  /**
   * Asks the user if they want to delete a given Template. If they want to, it then deletes it.
   *
   * @param id Identifier for the Template to delete
   */
  async deleteTemplate(id: number) {
    const response = confirm('Are you sure you want to delete this template?');

    if (!response) {
      return;
    }

    this.templatesService.deleteTemplate(id).subscribe({
      next: _ => {
        alert('Template was succesfully deleted');
        this.location.back();
      },
      error: err => {
        alert(err.message);
      },
    });
  }

  /**
   * Transforms the last
   *
   * @param movements$ Movements observable
   * @returns Ids observable
   */
  private getMovementsIds(movements$: Observable<Movement[]>): Observable<number[]> {
    return movements$.pipe(
      take(1),
      map(movements => movements.map(m => m.id)),
    );
  }
}
