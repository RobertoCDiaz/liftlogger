import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { MuscleGroup, WithMuscleGroupMetadata } from 'src/app/models/MuscleGroupModel';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-musclegroups-library',
  templateUrl: './musclegroups-library.component.html',
  styleUrls: ['./musclegroups-library.component.sass'],
})
export class MusclegroupsLibraryComponent implements OnInit {
  constructor(private groupsService: GroupsService) {}

  /**
   * Muscle Groups to display.
   */
  muscleGroups: WithMuscleGroupMetadata<MuscleGroup>[];

  ngOnInit(): void {
    this.groupsService.getUserGroups(true, true).subscribe(userGroups => {
      this.muscleGroups = userGroups;
    });
  }

  /**
   * Takes in a Date object and formats it into a readable form to display
   * in the page's view.
   *
   * @param date Date object to format
   * @returns Formatted date
   */
  formatDate(date?: Date): string | undefined {
    if (!date) {
      return;
    }
    return moment(date).format('MMM Do, Y');
  }
}
