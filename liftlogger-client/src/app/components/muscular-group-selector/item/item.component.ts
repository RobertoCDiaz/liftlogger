import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GroupsService } from 'src/app/services/groups.service';

type Group = {
  name: String,
  checked?: boolean,
  isPrimary?: boolean,
  groups?: Group[]
}

@Component({
  selector: 'app-muscular-group-selector-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent {

  @Input() data: Group[];
  @Input() group: Group;
  @Input() isExpanded: boolean = false;
  @Input() isMultipleChoice: boolean = true;

  constructor(private groupsService: GroupsService) { }

  onGroupToggle(groupName: String): void {
    this.groupsService.toggleGroup(
      groupName,
      this.data,
      !this.isMultipleChoice
    )


    console.log(this.groupsService.getSelectedGroups(this.data));
  }

  setPrimary(groupName: String): void {
    // this.group.isPrimary = true;
    if (!this.group.checked) {
      this.groupsService.toggleGroup(groupName, this.data, !this.isMultipleChoice)
    }

    this.groupsService.setGroupAsPrimary(groupName, this.data);
  }

  toggleExpanded(): void {
    if (!this.group.groups) {
      return;
    }

    this.isExpanded = !this.isExpanded;
  }

}
