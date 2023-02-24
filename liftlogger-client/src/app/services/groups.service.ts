import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Group, MOCK_GROUPS } from '../models/Groups';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  constructor() { }

  // getGroups(): Observable<Group[]> {
  //   return of(MOCK_GROUPS);
  // }
  getGroups(): Group[] {
    return MOCK_GROUPS;
  }

  clearSelectionsInGroup(groups: Group[]) {
    for (let group of groups) {
      group.checked = false;

      if (group.groups) {
        this.clearSelectionsInGroup(group.groups);
      }
    }
  }

  toggleGroup(name: String, groups: Group[], singleSelection: boolean = false): boolean {
    let checkedCount = 0;

    for (let group of groups) {
      // group.isPrimary = false;

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


  setGroupAsPrimary(name: String, groups: Group[]) {
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
