import { Component, Input } from '@angular/core';
import { Movement } from 'src/app/models/MovementModel';
import { MovementsPickerState } from '../movements-picker/movements-picker.component';

@Component({
  selector: 'app-movements-picker-movement-item',
  templateUrl: './movements-picker-movement-item.component.html',
  styleUrls: ['./movements-picker-movement-item.component.sass'],
})
export class MovementsPickerMovementItemComponent {
  /**
   * Movement to display in this item component.
   */
  @Input() movement: Movement;

  /**
   * Whether to disable anchor's href or not.
   */
  isHrefDisabled: boolean = false;

  constructor(public state: MovementsPickerState) {}

  ngOnInit() {
    this.sortGroups();

    this.state.isHrefDisabled().subscribe(disabled => {
      this.isHrefDisabled = disabled;
    });
  }

  /**
   * Sort the Movement's Muscle Groups so that the primary one shows up first in the list.
   */
  sortGroups() {
    if (!this.movement || !this.movement.groups) {
      return;
    }

    const primaryGroups = this.movement.groups.filter(g => g.id === this.movement.primary_group_id);
    const nonPrimaryGroups = this.movement.groups.filter(
      g => g.id !== this.movement.primary_group_id,
    );

    this.movement.groups = [...primaryGroups, ...nonPrimaryGroups];
  }

  /**
   * Updates the MovementsPicker state, and notifies of a new
   * selected Movement
   */
  handleMovementSelected() {
    this.state.setMovement(this.movement);
  }
}
