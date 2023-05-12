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

  muscleGroups: WithMuscleGroupMetadata<MuscleGroup>[];

  ngOnInit(): void {
    this.groupsService.getUserGroups(true, true).subscribe(userGroups => {
      this.muscleGroups = userGroups;
    });
  }

  formatDate(date?: Date): string {
    if (!date) {
      return 'No data available';
    }
    return moment(date).format('MMM Do, Y');
  }
}
