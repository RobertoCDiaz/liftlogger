import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { GroupsService } from 'src/app/services/groups.service';

/**
 * Defines the state for the MuscularGroupSelectorComponent.
 */
export class MuscularGroupSelectorState {
  /**
   * Muscle groups to display in the component.
   */
  userGroups: MuscleGroup[] = [];

  /**
   * Whether the component should allow multiselection or not. Defaults to `true`.
   */
  isMultiSelectable: boolean = true;
}

@Component({
  selector: 'app-muscular-group-selector',
  templateUrl: './muscular-group-selector.component.html',
  styleUrls: ['./muscular-group-selector.component.sass'],
  providers: [MuscularGroupSelectorState],
})
export class MuscularGroupSelectorComponent {
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
   *
   * param: `$event: Group[]` List of selected groups
   */
  @Output() selectionChanged = new EventEmitter<MuscleGroup[]>();

  constructor(private groupsService: GroupsService, public state: MuscularGroupSelectorState) {}

  ngOnChanges() {
    this.groupsService.getUserGroups().subscribe(userGroups => {
      this.state.userGroups = this.groupsService.organizeGroups(userGroups);
    });

    this.state.isMultiSelectable = this.isMultipleChoice;
  }

  /**
   * Emits the `selectionChanged` event with the currently selected groups.
   */
  handleItemToggled() {
    this.selectionChanged.emit(this.groupsService.getSelectedGroups(this.state.userGroups));
  }
}
