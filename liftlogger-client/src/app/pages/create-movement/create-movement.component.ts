import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { MovementCreationParams } from 'src/app/models/MovementModel';
import { MovementsService } from 'src/app/services/movements.service';

@Component({
  selector: 'app-create-movement',
  templateUrl: './create-movement.component.html',
  styleUrls: ['./create-movement.component.sass'],
})
export class CreateMovementComponent {
  /**
   * Determines whether if the creation button is enabled or not.
   */
  isCreationEnabled: boolean = false;

  /**
   * Stores the new Movement's name.
   */
  movementName: string;

  /**
   * Stores the new Movement's description.
   */
  movementDescription: string;

  /**
   * Holds what MuscleGroups are selected for this new Movement.
   */
  selectedGroups: Group[] = [];

  constructor(private movementsService: MovementsService, private router: Router) {}

  /**
   * Calls for the creation of this new Movement.
   */
  createMovement() {
    if (
      !this.movementName ||
      !this.movementDescription ||
      this.movementName === '' ||
      this.movementDescription === ''
    ) {
      alert('You have missing information');
      return;
    }

    if (this.selectedGroups.length === 0) {
      alert('Select at least one muscle group');
      return;
    }

    const movement: MovementCreationParams = {
      name: this.movementName,
      description: this.movementDescription,
    };

    this.movementsService.createMovement(movement, this.selectedGroups).subscribe(mov => {
      this.router.navigate(['movements']);
    });
  }

  /**
   * Checks whether creation should be enabled or not, and updates the `isCreationEnabled` variable.
   */
  updateCreationEnabled() {
    if (!this.movementName || !this.movementDescription) {
      this.isCreationEnabled = false;
      return;
    }

    if (this.movementName === '' || this.movementDescription === '') {
      this.isCreationEnabled = false;
      return;
    }

    if (this.selectedGroups.length === 0) {
      this.isCreationEnabled = false;
      return;
    }

    this.isCreationEnabled = true;
  }

  /**
   * Sets the `movementName` variable to assign later as the Movement's name.
   *
   * @param value New name value
   */
  setMovementName(value: string) {
    this.movementName = value;
    this.updateCreationEnabled();
  }

  /**
   * Sets the `movementDescription` variable to assign later as the Movement's description.
   *
   * @param value New name description
   */
  setMovementDescription(value: string) {
    this.movementDescription = value;
    this.updateCreationEnabled();
  }

  /**
   * Sets the `selectedGroups` list to the array of groups passed as an argument.
   *
   * @param selectedGroups List of selected groups
   */
  handleGroupSelectionChanged(selectedGroups: Group[]) {
    this.selectedGroups = selectedGroups;
    this.updateCreationEnabled();
  }
}
