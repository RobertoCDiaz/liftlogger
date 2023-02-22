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
    // this.group.checked = !this.group.checked;
    this.groupsService.toggleGroup(
      groupName,
      this.data,
      !this.isMultipleChoice // TODO: enable single selection
    )


    console.log(this.groupsService.getSelectedGroups(this.data));
  }

  setPrimary(): void {
    this.group.isPrimary = true;
  }

  toggleExpanded(): void {
    if (!this.group.groups) {
      return;
    }

    this.isExpanded = !this.isExpanded;
  }

}
