import { Component, Input } from '@angular/core';
import { Movement } from 'src/app/models/Movement';
import { MovementsPickerState } from '../movements-picker/movements-picker.component';

@Component({
  selector: 'app-movements-picker-movement-item',
  templateUrl: './movements-picker-movement-item.component.html',
  styleUrls: ['./movements-picker-movement-item.component.sass']
})
export class MovementsPickerMovementItemComponent {
  /**
   * Movement to display in this item component.
   */
  @Input() movement: Movement;

  constructor(public state: MovementsPickerState) { }

  /**
   * Updates the MovementsPicker state, and notifies of a new
   * selected Movement
   */
  handleMovementSelected() {
    this.state.setMovement(this.movement);
  }
}
