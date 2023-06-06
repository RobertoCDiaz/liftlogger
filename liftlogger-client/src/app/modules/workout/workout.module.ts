import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartWorkoutComponent } from '../../pages/start-workout/start-workout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [StartWorkoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: StartWorkoutComponent, title: 'Start new workout' },
    ]),
  ],
})
export class WorkoutModule {}
