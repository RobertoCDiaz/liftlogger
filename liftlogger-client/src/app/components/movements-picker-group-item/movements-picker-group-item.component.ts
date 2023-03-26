import { Component, Input } from '@angular/core';
import { Group } from 'src/app/models/Group';

@Component({
  selector: 'app-movements-picker-group-item',
  templateUrl: './movements-picker-group-item.component.html',
  styleUrls: ['./movements-picker-group-item.component.sass'],
})
export class MovementsPickerGroupItemComponent {
  /**
   * Group to display in this item component.
   */
  @Input() group: Group;

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
