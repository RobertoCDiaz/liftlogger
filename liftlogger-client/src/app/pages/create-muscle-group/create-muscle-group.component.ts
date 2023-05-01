import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreatorForm } from 'src/app/components/creator-page/creator-page.component';
import { MuscleGroup } from 'src/app/models/MuscleGroupModel';
import { GroupsService } from 'src/app/services/groups.service';

/**
 * UI for the Create Muscle Group page.
 */
@Component({
  selector: 'app-create-muscle-group',
  templateUrl: './create-muscle-group.component.html',
  styleUrls: ['./create-muscle-group.component.sass'],
})
export class CreateMuscleGroupComponent {
  /**
   * Currently selected group as parent group for the new group.
   */
  parentGroup: MuscleGroup;

  /**
   * Stores the data to create a new Muscle Group. Its name is stored as
   * the `title` property, and its description is `description`.
   */
  groupForm: CreatorForm = new FormGroup({
    title: new FormControl<string | null>(null, { validators: Validators.required }),
    description: new FormControl<string | null>(null, { validators: Validators.required }),
  });

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
    if (this.groupForm.invalid) {
      alert('You have missing properties');
      return;
    }

    this.groupsService
      .createGroup({
        name: this.groupForm.value.title!,
        description: this.groupForm.value.description!,
        parent_group_id: this.parentGroup?.id ?? undefined, //defining a parent group is not necessary
      })
      .subscribe(resultGroup => {
        this.location.back();
      });
  }

  /**
   * Updates Muscle Group information.
   */
  handleFormChanged(form: CreatorForm) {
    this.groupForm = form;
  }
}
