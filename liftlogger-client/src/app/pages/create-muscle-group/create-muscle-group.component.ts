import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CreatorPageState } from 'src/app/components/creator-page/creator-page.component';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { GroupsService } from 'src/app/services/groups.service';

/**
 * UI for the Create Muscle Group page.
 */
@Component({
  selector: 'app-create-muscle-group',
  templateUrl: './create-muscle-group.component.html',
  styleUrls: ['./create-muscle-group.component.sass'],
  providers: [CreatorPageState],
})
export class CreateMuscleGroupComponent {
  creatorPageState: CreatorPageState = inject(CreatorPageState);

  /**
   * Currently selected group as parent group for the new group.
   */
  parentGroup: MuscleGroup;

  constructor(private groupsService: GroupsService, private location: Location) {}

  /**
   * Sets the parent group when a new Muscle Group is selected.
   *
   * @param selectedGroups List of selected groups from the Group Selector component.
   */
  onSelectionChanged(selectedGroups: MuscleGroup[]): void {
    this.parentGroup = selectedGroups[0];
  }

  /**
   * Tries to create a new group. When a group is succesfully created,
   * it redirects the user one page back in history.
   */
  onCreateClicked() {
    if (!this.creatorPageState.isFormValid(true)) {
      alert('You have missing properties');
      return;
    }

    const formValues = this.creatorPageState.getFormValues();

    this.groupsService
      .createGroup({
        name: formValues.title!,
        description: formValues.description!,
        parent_group_id: this.parentGroup?.id ?? undefined, //defining a parent group is not necessary
      })
      .subscribe(_ => {
        this.location.back();
      });
  }
}
