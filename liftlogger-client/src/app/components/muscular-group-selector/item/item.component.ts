import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-muscular-group-selector-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent {

  /**
   * Main data source for the whole muscular groups tree.
   */
  @Input() data: Group[];

  /**
   * The Group object for this item.
   */
  @Input() group: Group;

  /**
   * A boolean value indicating whether the item is currently expanded or not.
   */
  @Input() isExpanded: boolean = false;

  /**
   * A boolean value indicating whether multiple groups can be selected at once or not.
   */
  @Input() isMultipleChoice: boolean = true;

  /**
   * Fires when this item is toggled (e.g. It is checked or unchecked).
   */
  @Output() itemToggled = new EventEmitter<Group>();

  /**
   * Constructor of ItemComponent that injects GroupsService.
   * @param groupsService The GroupsService used to perform group-related operations.
   */
  constructor(private groupsService: GroupsService) { }

  /**
   * Toggles the selection state of the specified group.
   * @param groupName The name of the group to toggle.
   */
  toggleChecked(group: Group): void {
    this.groupsService.toggleGroup(
      group,
      this.data,
      !this.isMultipleChoice
    )

    this.itemToggled.emit(group);
  }

  /**
   * Sets the specified group as the primary selection and toggles its selection state if it is not already selected.
   *
   * @param group Group to be set as primary.
   */
  setPrimary(group: Group): void {
    if (!this.group.checked) {
      this.groupsService.toggleGroup(group, this.data, !this.isMultipleChoice)
    }

    this.groupsService.setGroupAsPrimary(group, this.data);
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
