import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';
import { HttpService } from './http.service';

/**
 * Collection of methods and operations to help in the MuscleGroups handling.
 */
@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor(private http: HttpService) { }

  /**
   * Retrieves the groups owned by the current user.
   *
   * @param withMovements Whether the returned groups should also include their Movements or not
   * @returns An array of Group objects representing the groups
   */
  getUserGroups(withMovements: boolean = false): Observable<Group[]> {
    return this.http.get<Group[]>('groups' + (withMovements ? '?withMovements=true' : ''));
  }

  /**
   * Creates a new Muscle Group and inserts it into DB.
   *
   * @param group Group to be inserted into DB.
   * @returns Succesfully created group.
   */
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group, Group>('groups', group);
  }

  /**
   * Given a list of Groups, search its Movements for a match in
   * their names or descriptions.
   *
   * @param searchQuery Query to filter Movements
   * @param groups List of groups to search Movements in
   * @returns Filtered Groups, with only the Movements that match the criteria
   */
  searchMovementsInGroups(searchQuery: string, groups: Group[]): Group[] {
    const groupsCopy: Group[] = JSON.parse(JSON.stringify(groups));

    return groupsCopy.filter(group => {
      if (!group.movements) {
        return false;
      }

      group.movements = group.movements.filter(movement => {
        return movement.name.toLowerCase().includes(searchQuery) ||
          movement.description.toLowerCase().includes(searchQuery);
      })

      return group.movements.length > 0;
    });
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

  /**
   * Traverse a list of groups and unchecks their `checked` and `isPrimary` properties.
   *
   * @param groups List of groups to uncheck
   * @param onlyUncheckPrimaryState Whether if just the `isPrimary` property should be unchecked or not. Defaults to `false`
   */
  unCheckAllGroups(groups: Group[], onlyUncheckPrimaryState: boolean = false) {
    for (let group of groups) {
      if (!onlyUncheckPrimaryState) {
        group.checked = false;
      }
      group.isPrimary = false;

      if (group.groups) {
        this.unCheckAllGroups(group.groups, onlyUncheckPrimaryState);
      }
    }
  }
}
