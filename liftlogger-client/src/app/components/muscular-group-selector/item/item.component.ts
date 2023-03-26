import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { GroupsService } from 'src/app/services/groups.service';
import { MuscularGroupSelectorState } from '../muscular-group-selector.component';

@Component({
  selector: 'app-muscular-group-selector-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass'],
})
export class ItemComponent {
  /**
   * The Group object for this item.
   */
  @Input() group: Group;

  /**
   * A boolean value indicating whether the item is currently expanded or not.
   */
  @Input() isExpanded: boolean = false;

  /**
   * Fires when this item is toggled (e.g. It is checked or unchecked).
   */
  @Output() itemToggled = new EventEmitter<Group>();

  constructor(private state: MuscularGroupSelectorState, private groupService: GroupsService) {}

  /**
   * Toggles the selection state for the current group.
   */
  toggleChecked(): void {
    // TODO: Also toggle parent groups
    if (!this.state.isMultiSelectable) {
      this.groupService.unCheckAllGroups(this.state.userGroups);
    }

    this.group.checked = !this.group.checked;

    if (!this.group.checked) {
      this.group.isPrimary = false;
    }

    this.itemToggled.emit(this.group);
  }

  /**
   * Sets the specified group as the primary selection and toggles its selection state
   * if it is not already selected.
   */
  setPrimary(): void {
    this.groupService.unCheckAllGroups(this.state.userGroups, true);
    if (!this.group.checked) {
      this.toggleChecked();
    }

    this.group.isPrimary = true;
  }

  /**
   * Toggles the expanded state of this item.
   */
  toggleExpanded(): void {
    if (!this.group.groups) {
      return;
    }

    this.isExpanded = !this.isExpanded;
  }
}
