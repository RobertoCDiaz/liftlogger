import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartWorkoutComponent } from '../../pages/start-workout/start-workout.component';
import { RouterModule } from '@angular/router';
import { GlobalModule } from '../global/global.module';
import { MovementsCommonModule } from '../movements-common/movements-common.module';

/**
 * Implementation of the Workout feature.
 */
@NgModule({
  declarations: [StartWorkoutComponent],
  imports: [
    CommonModule,
    GlobalModule,
    MovementsCommonModule,
    RouterModule.forChild([
      { path: '', component: StartWorkoutComponent, title: 'Start new workout' },
    ]),
  ],
})
export class WorkoutModule {}
