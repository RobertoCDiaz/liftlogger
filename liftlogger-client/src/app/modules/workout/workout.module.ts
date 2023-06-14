import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartWorkoutComponent } from '../../pages/start-workout/start-workout.component';
import { RouterModule } from '@angular/router';
import { GlobalModule } from '../global/global.module';
import { MovementsCommonModule } from '../movements-common/movements-common.module';
import { WorkoutWeightliftingComponent } from '../../pages/workout-weightlifting/workout-weightlifting.component';
import { WeightliftingTimerComponent } from 'src/app/components/weightlifting-timer/weightlifting-timer.component';

const components = [
  StartWorkoutComponent,
  WorkoutWeightliftingComponent,
  WeightliftingTimerComponent,
];

/**
 * Implementation of the Workout feature.
 */
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    GlobalModule,
    MovementsCommonModule,
    RouterModule.forChild([
      { path: '', component: StartWorkoutComponent, title: 'Start new workout' },
      { path: 'weightlifting', component: WorkoutWeightliftingComponent, title: 'Weightlifting' },
    ]),
  ],
  exports: components,
})
export class WorkoutModule {}
