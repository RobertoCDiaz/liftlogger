import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';

/**
 * UI for the Create Muscle Group page.
 */
@Component({
  selector: 'app-create-muscle-group',
  templateUrl: './create-muscle-group.component.html',
  styleUrls: ['./create-muscle-group.component.sass']
})
export class CreateMuscleGroupComponent {
  /**
   * Currently selected group as parent group for the new group.
   */
  parentGroup: Group;

  /**
   * Determines whether the Create button should be enabled or not.
   */
  isCreationEnabled: boolean = false;

  /**
   * Name for the new Muscle Group.
   */
  private groupName: string;

  /**
   * Description for the new Muscle Group.
   */
  private groupDescription: string;

  constructor(private groupsService: GroupsService, private location: Location) { }

  /**
   * Sets the parent group when a new Muscle Group is selected.
   *
   * @param selectedGroups List of selected groups from the Group Selector component.
   */
  onSelectionChanged(selectedGroups: Group[]): void {
    this.parentGroup = selectedGroups[0];

    this.checkCreationAbility();
  }

  /**
   * Tries to create a new group. When a group is succesfully created,
   * it redirects the user one page back in history.
   */
  async onCreateClicked() {
    if (!this.isCreationEnabled) {
      alert('You have missing properties');
      return;
    }

    (await this.groupsService.createGroup({
      name: this.groupName,
      description: this.groupDescription,
      parent_group_id: this.parentGroup?.id ?? undefined,
    })).subscribe(resultGroup => {
      alert(`[${resultGroup.name}] muscle group was succesfully created!`);
      this.location.back();
    })
  }

  /**
   * Changes the name for the group.
   *
   * @param value Value for the group's name.
   */
  groupNameChanged(value: string): void {
    this.groupName = value;

    this.checkCreationAbility();
  }

  /**
   * Changes the description for the group.
   *
   * @param value Value for the group's description.
   */
  groupDescriptionChanged(value: string): void {
    this.groupDescription = value;

    this.checkCreationAbility();
  }

  /**
   * Checks if creation should be enabled. If so, changes
   * the state of the `isCreationEnabled` variable.
   */
  checkCreationAbility(): void {
    // creation is not enabled if no group or description is specified
    this.isCreationEnabled = !(!this.groupName || !this.groupDescription)
  }

}
