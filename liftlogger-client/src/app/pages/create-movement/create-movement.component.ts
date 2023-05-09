import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { MovementCreationParams } from 'src/app/models/MovementModel';
import { MovementsService } from 'src/app/services/movements.service';
import { CreatorForm } from 'src/app/components/creator-page/creator-page.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Page that displays the creation form to insert a new Movement into the user's library.
 */
@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.sass'],
})
export class CreateMovementComponent {
  /**
   * FormGroup that will store the new Movement's information
   */
  movementForm: CreatorForm = new FormGroup({
    title: new FormControl<string | null>(null, { validators: [Validators.required] }),
    description: new FormControl<string | null>(null, { validators: [Validators.required] }),
  });

  /**
   * Holds what MuscleGroups are selected for this new Movement.
   */
  selectedGroups: MuscleGroup[] = [];

  constructor(private movementsService: MovementsService, private router: Router) {}

  /**
   * Calls for the creation of this new Movement.
   */
  createMovement() {
    if (!this.shouldEnableCreation()) {
      alert('You have missing information');
      return;
    }

    const movement: MovementCreationParams = {
      name: this.movementForm.value.title!,
      description: this.movementForm.value.description!,
    };

    this.movementsService.createMovement(movement, this.selectedGroups).subscribe(mov => {
      this.router.navigate(['movements']);
    });
  }

  /**
   * Checks whether creation should be enabled or not, and updates the `isCreationEnabled` variable.
   */
  shouldEnableCreation(): boolean {
    if (this.movementForm.invalid) {
      return false;
    }

    if (this.selectedGroups.length === 0) {
      return false;
    }

    return true;
  }

  /**
   * Updates the Movement's information.
   *
   * @param form Form used to update the new Movement's values
   */
  handleFormChanged(form: CreatorForm) {
    this.movementForm = form;
  }

  /**
   * Sets the `selectedGroups` list to the array of groups passed as an argument.
   *
   * @param selectedGroups List of selected groups
   */
  handleGroupSelectionChanged(selectedGroups: MuscleGroup[]) {
    this.selectedGroups = selectedGroups;
  }
}
