// TODO: Document this page
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';


@Component({
  selector: 'app-create-muscle-group',
  templateUrl: './create-muscle-group.component.html',
  styleUrls: ['./create-muscle-group.component.sass']
})
export class CreateMuscleGroupComponent {
  selectedGroup: Group;
  isCreationEnabled: boolean = false;

  private groupName: string;
  private groupDescription: string;

  constructor(private groupsService: GroupsService, private location: Location) { }

  onSelectionChanged(selectedGroups: Group[]): void {
    this.selectedGroup = selectedGroups[0];

    this.checkCreationAbility();
  }

  onCreateClicked(): void {
    if (!this.groupName || !this.groupDescription) {
      alert('You have missing properties');
      return;
    }

    this.groupsService.createGroup({
      name: this.groupName,
      description: this.groupDescription,
      user_email: "robertocdiazsanchez@gmail.com", // TODO: use real user email once auth is implemented
      parent_group_id: this.selectedGroup.id ?? undefined,
    }).subscribe(resultGroup => {
      alert(`[${resultGroup.name}] muscle group was succesfully created!`);
      this.location.back();
    })
  }

  groupNameChanged(value: string): void {
    this.groupName = value;

    this.checkCreationAbility();
  }

  groupDescriptionChanged(value: string): void {
    this.groupDescription = value;

    this.checkCreationAbility();
  }

  checkCreationAbility(): void {
    // creation is not enabled if no group or description is specified
    this.isCreationEnabled = !(!this.groupName || !this.groupDescription)
  }

}
