import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  MuscleGroup,
  MuscleGroupCreationParams,
  WithMuscleGroupMetadata,
} from '../models/MuscleGroupModel';
import { HttpService } from './http.service';

/**
 * Collection of methods and operations to help in the MuscleGroups handling.
 */
@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  constructor(private http: HttpService) {}

  /**
   * Retrieves the groups owned by the current user.
   *
   * @param withMovements Whether the returned groups should also include their Movements or not
   * @param withMetadata Whether the response MuscleGroups should have their metadata or not. Defaults to `false`
   * @returns An array of Group objects representing the groups
   */
  getUserGroups(
    withMovements: boolean = false,
    withMetadata: boolean = false,
  ): Observable<WithMuscleGroupMetadata<MuscleGroup>[]> {
    return this.http.get<WithMuscleGroupMetadata<MuscleGroup>[]>(
      'groups?' +
        (withMovements ? 'withMovements=true&' : '') +
        (withMetadata ? 'withMetadata=true&' : ''),
    );
  }

  /**
   * Retrieves a MuscleGroup owned by the current user.
   *
   * @param groupId MuscleGroup identifier
   * @param withMovements Whether the returned group should also include its Movements or not Defaults to `false`
   * @param withMetadata Whether the response MuscleGroup should have its metadata or not. Defaults to `false`
   * @returns The fetched MuscleGroup
   */
  getGroup(
    groupId: number,
    withMovements: boolean = false,
    withMetadata: boolean = false,
  ): Observable<WithMuscleGroupMetadata<MuscleGroup>> {
    return this.http.get<WithMuscleGroupMetadata<MuscleGroup>>(
      'groups/' +
        groupId +
        '?' +
        (withMovements ? 'withMovements=true&' : '') +
        (withMetadata ? 'withMetadata=true&' : ''),
    );
  }

  /**
   * Creates a new Muscle Group and inserts it into DB.
   *
   * @param group Group to be inserted into DB.
   * @returns Succesfully created group.
   */
  createGroup(group: MuscleGroupCreationParams): Observable<MuscleGroup> {
    return this.http.post<MuscleGroupCreationParams, MuscleGroup>('groups', group);
  }

  /**
   * Given a list of Groups, search its Movements for a match in
   * their names or descriptions.
   *
   * @param searchQuery Query to filter Movements
   * @param groups List of groups to search Movements in
   * @returns Filtered Groups, with only the Movements that match the criteria
   */
  searchMovementsInGroups(searchQuery: string, groups: MuscleGroup[]): MuscleGroup[] {
    const groupsCopy: MuscleGroup[] = JSON.parse(JSON.stringify(groups));

    return groupsCopy.filter(group => {
      if (!group.movements) {
        return false;
      }

      group.movements = group.movements.filter(movement => {
        return (
          movement.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          movement.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      return group.movements.length > 0;
    });
  }

  /**
   * Organizes an array of Group objects into a hierarchical structure, based on the parent_group_id property of each group.
   *
   * @param groups An array of Group objects to be organized.
   * @returns An array of root-level Group objects with their nested sub-groups added to the 'groups' property of each Group, forming a hierarchical structure.
   */
  organizeGroups(groups: MuscleGroup[]): MuscleGroup[] {
    const result: MuscleGroup[] = [];
    const groupsCopy: MuscleGroup[] = JSON.parse(JSON.stringify(groups));

    groupsCopy.forEach(group => {
      if (!group.parent_group_id) {
        result.push(group);
        return;
      }

      const parent = result.filter(resultGroup => resultGroup.id === group.parent_group_id)[0];

      if (!parent.groups) {
        parent.groups = [];
      }

      parent.groups.push(group);
    });

    return result;
  }

  /**
   * Retrieves an array of strings representing the names of all checked groups in a list.
   *
   * @param groups - An array of Group objects representing the groups to search.
   * @returns An array of strings representing the names of all checked groups.
   */
  getSelectedGroups(groups: MuscleGroup[]): MuscleGroup[] {
    let selectedGroups: MuscleGroup[] = [];

    for (let group of groups) {
      if (group.checked) {
        selectedGroups.push(group);
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
  unCheckAllGroups(groups: MuscleGroup[], onlyUncheckPrimaryState: boolean = false) {
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
