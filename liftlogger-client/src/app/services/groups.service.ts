import { Injectable } from '@angular/core';
import { Group, MOCK_GROUPS } from '../models/Groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor() { }

  /**
   * Retrieves a list of groups.
   *
   * @returns An array of Group objects representing the groups.
   */
  getGroups(): Group[] {
    return MOCK_GROUPS;
  }

  /**
   * Toggles the checked state of a group with the specified name, and optionally
   * toggles the checked state of all other groups to false if singleSelection is
   * set to true.
   *
   * @param name - The name of the group to toggle.
   * @param groups - An array of Group objects representing the groups to search.
   * @param singleSelection - A flag indicating whether only one group can be checked at a time.
   * @returns A boolean indicating whether at least one group is checked.
   */
  toggleGroup(name: String, groups: Group[], singleSelection: boolean = false): boolean {
    let checkedCount = 0;

    for (let group of groups) {
      if (singleSelection) {
        group.checked = false;
      }

      if (group.name === name) {
        group.checked = !group.checked;

        if (group.isPrimary) {
          group.isPrimary = false;
        }
      }

      if (group.checked) {
        checkedCount++;
      }

      if (group.groups) {
        const childWasChecked = this.toggleGroup(name, group.groups, singleSelection);

        if (childWasChecked && !singleSelection) {
          checkedCount++;
        }
      }
    }

    if (!singleSelection || checkedCount <= 1) {
      return checkedCount > 0;
    }

    for (let group of groups) {
      if (group.name !== name && group.checked) {
        group.checked = false;
      }
    }

    return true;
  }

  /**
   * Sets a group with the specified name as the primary group, and unsets all other
   * groups as primary.
   *
   * @param name - The name of the group to set as primary.
   * @param groups - An array of Group objects representing the groups to search.
   */
  setGroupAsPrimary(name: String, groups: Group[]): void {
    for (let group of groups) {
      group.isPrimary = false;

      if (group.name === name && group.checked) {
        group.isPrimary = true;
      }

      if (group.groups) {
        this.setGroupAsPrimary(name, group.groups);
      }
    }
  }

  /**
   * Retrieves an array of strings representing the names of all checked groups in a list.
   *
   * @param groups - An array of Group objects representing the groups to search.
   * @returns An array of strings representing the names of all checked groups.
   */
  getSelectedGroups(groups: Group[]): String[] {
    let selectedGroups: String[] = [];

    for (let group of groups) {
      if (group.checked) {
        selectedGroups.push(group.name)
      }

      if (group.groups) {
        selectedGroups.push(...this.getSelectedGroups(group.groups));
      }
    }

    return selectedGroups;
  }
}
