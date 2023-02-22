import { Injectable } from '@angular/core';
import { Observable, of, single } from 'rxjs';
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

  // TODO: Al seleccionar un hijo, el padre también se selecciona
  toggleGroup(name: String, groups: Group[], singleSelection: boolean = false) {
    for (let group of groups) {
      group.isPrimary = false;

      if (singleSelection) {
        group.checked = false;
      }

      if (group.name === name) {
        group.checked = !group.checked;
      }

      if (group.groups) {
        this.toggleGroup(name, group.groups, singleSelection);
      }
    }
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
