import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from 'src/app/models/Groups';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-muscular-group-selector',
  templateUrl: './muscular-group-selector.component.html',
  styleUrls: ['./muscular-group-selector.component.sass']
})
export class MuscularGroupSelectorComponent {

  /**
   * Source of data to populate the component.
   */
  groups: Group[];

  /**
   * Whether multiple groups can be selected at once or not.
   */
  @Input() isMultipleChoice: boolean = true;

  /**
   * Main text to show. Useful for titles.
   */
  @Input() text: String = 'Select a muscular group...';

  /**
   * Optional text to show as secondary instructions.
   */
  @Input() secondaryText?: String;

  /**
   * Fires up when a group selection is changed (e.g. a group is checked or unchecked).
   */
  @Output() selectionChanged = new EventEmitter<Group[]>();

  constructor(private groupsService: GroupsService) { }

  ngOnInit() {
    this.groupsService.getGroups().subscribe(groups => {
      this.groups = this.groupsService.organizeGroups(groups);
    });
  }

  /**
   * Emits the currently selected groups through the `selectionChanged` emitter when
   * a group is toggled.
   */
  groupToggled() {
    const selectedGroups = this.groupsService.getSelectedGroups(this.groups);

    this.selectionChanged.emit(selectedGroups);
  }

}
