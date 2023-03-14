// TODO: Refactor group selection. (Should it be delegated to the global groups service?)
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/Groups';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpService) { }

  /**
   * Retrieves a list of groups.
   *
   * @returns An array of Group objects representing the groups.
   */
  async getGroups(): Promise<Observable<Group[]>> {
    return this.http.getAuth<Group[]>('groups');
  }

  /**
   * Creates a new Muscle Group and inserts it into DB.
   *
   * @param group Group to be inserted into DB.
   * @returns Succesfully created group.
   */
  async createGroup(group: Group): Promise<Observable<Group>> {
    return await this.http.postAuth<Group, Group>('groups', group);
  }

  /**
   * Organizes an array of Group objects into a hierarchical structure, based on the parent_group_id property of each group.
   *
   * @param groups An array of Group objects to be organized.
   * @returns An array of root-level Group objects with their nested sub-groups added to the 'groups' property of each Group, forming a hierarchical structure.
   */
  organizeGroups(groups: Group[]): Group[] {
    const groupsById: Record<number, Group> = {};

    // Create a lookup table to easily find a group by its ID
    groups.forEach(group => {
      if (!group.id) return;

      groupsById[group.id] = group;
    })

    const rootGroups: Group[] = [];
    groups.forEach(group => {
      if (!group.parent_group_id) {
        // If a group has no parent, it is a root group
        rootGroups.push(group);
        return;
      };

      // If a group has a parent, find the parent group by ID
      const parent = groupsById[group.parent_group_id];

      // Create an empty array of sub-groups for the parent if it doesn't exist
      parent.groups = parent.groups ?? [];

      // Add the current group as a sub-group of its parent
      parent.groups.push(group);
    })

    return rootGroups;
  }

  /**
   * Toggles the checked state of a group with the specified name, and optionally
   * toggles the checked state of all other groups to false if singleSelection is
   * set to true.
   *
   * @param groupToBeToggled - Group reference to be toggled.
   * @param groups - An array of Group objects representing the groups to search.
   * @param singleSelection - A flag indicating whether only one group can be checked at a time.
   * @returns A boolean indicating whether at least one group is checked.
   */
  toggleGroup(groupToBeToggled: Group, groups: Group[], singleSelection: boolean = false): boolean {
    let checkedCount = 0;

    for (let group of groups) {
      if (singleSelection) {
        group.checked = false;
      }

      if (group.id === groupToBeToggled.id) {
        group.checked = !group.checked;

        if (group.isPrimary) {
          group.isPrimary = false;
        }
      }

      if (group.checked) {
        checkedCount++;
      }

      if (group.groups) {
        const childWasChecked = this.toggleGroup(groupToBeToggled, group.groups, singleSelection);

        if (childWasChecked && !singleSelection) {
          checkedCount++;
        }
      }
    }

    if (!singleSelection || checkedCount <= 1) {
      return checkedCount > 0;
    }

    for (let group of groups) {
      if (group.id !== groupToBeToggled.id && group.checked) {
        group.checked = false;
      }
    }

    return true;
  }

  /**
   * Sets a group with the specified name as the primary group, and unsets all other
   * groups as primary.
   *
   * @param targetGroup - Group to be set as primary group.
   * @param groups - An array of Group objects representing the groups to search.
   */
  setGroupAsPrimary(targetGroup: Group, groups: Group[]): void {
    for (let group of groups) {
      group.isPrimary = false;

      if (group.id === targetGroup.id && group.checked) {
        group.isPrimary = true;
      }

      if (group.groups) {
        this.setGroupAsPrimary(targetGroup, group.groups);
      }
    }
  }

  /**
   * Retrieves an array of strings representing the names of all checked groups in a list.
   *
   * @param groups - An array of Group objects representing the groups to search.
   * @returns An array of strings representing the names of all checked groups.
   */
  getSelectedGroups(groups: Group[]): Group[] {
    let selectedGroups: Group[] = [];

    for (let group of groups) {
      if (group.checked) {
        selectedGroups.push(group)
      }

      if (group.groups) {
        selectedGroups.push(...this.getSelectedGroups(group.groups));
      }
    }

    return selectedGroups;
  }
}
