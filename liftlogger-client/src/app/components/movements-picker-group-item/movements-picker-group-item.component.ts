import { Component, Input } from '@angular/core';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';

@Component({
  selector: 'app-movements-picker-group-item',
  templateUrl: './movements-picker-group-item.component.html',
  styleUrls: ['./movements-picker-group-item.component.sass'],
})
export class MovementsPickerGroupItemComponent {
  /**
   * Group to display in this item component.
   */
  @Input() group: MuscleGroup;

  /**
   * Whether the component should display its movements or not.
   */
  isOpen: boolean = false;

  /**
   * Toggles the visibility of this group's Movements.
   */
  toggleContent() {
    this.isOpen = !this.isOpen;
  }
}
