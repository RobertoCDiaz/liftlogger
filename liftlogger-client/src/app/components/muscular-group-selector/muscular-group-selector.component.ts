import { Component, Input } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-muscular-group-selector',
  templateUrl: './muscular-group-selector.component.html',
  styleUrls: ['./muscular-group-selector.component.sass']
})
export class MuscularGroupSelectorComponent {
  data: Group[];

  @Input() isMultipleChoice: boolean = true;
  @Input() text: String = 'Select a muscular group...';
  @Input() secondaryText?: String;

  selectedGroups: Group[] = [];

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(groups => {
      this.data = this.groupsService.organizeGroups(groups);
    });
  }

}
