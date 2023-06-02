import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { MovementCreationParams } from 'src/app/models/MovementModel';
import { MovementsService } from 'src/app/services/movements.service';
import { CreatorPageState } from 'src/app/components/creator-page/creator-page.component';

/**
 * Page that displays the creation form to insert a new Movement into the user's library.
 */
@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.sass'],
  providers: [CreatorPageState],
})
export class CreateMovementComponent {
  creatorPageState: CreatorPageState = inject(CreatorPageState);

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

    const formValues = this.creatorPageState.getFormValues();
    const movement: MovementCreationParams = {
      name: formValues.title!,
      description: formValues.description!,
    };

    this.movementsService.createMovement(movement, this.selectedGroups).subscribe(mov => {
      this.router.navigate(['movements']);
    });
  }

  /**
   * Checks whether creation should be enabled or not, and updates the `isCreationEnabled` variable.
   */
  shouldEnableCreation(): boolean {
    if (!this.creatorPageState.isFormValid(true)) {
      return false;
    }

    if (this.selectedGroups.length === 0) {
      return false;
    }

    return true;
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
