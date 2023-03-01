// TODO: Document this component
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-muscular-group-selector',
  templateUrl: './muscular-group-selector.component.html',
  styleUrls: ['./muscular-group-selector.component.sass']
})
export class MuscularGroupSelectorComponent {
  groups: Group[];

  @Input() isMultipleChoice: boolean = true;
  @Input() text: String = 'Select a muscular group...';
  @Input() secondaryText?: String;

  @Output() selectionChanged = new EventEmitter<Group[]>();

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = this.groupsService.organizeGroups(groups);
    });
  }

  groupToggled() {
    const selectedGroups = this.groupsService.getSelectedGroups(this.groups);

    this.selectionChanged.emit(selectedGroups);
  }

}
