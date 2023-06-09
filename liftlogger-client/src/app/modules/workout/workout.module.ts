import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartWorkoutComponent } from '../../pages/start-workout/start-workout.component';
import { RouterModule } from '@angular/router';
import { GlobalModule } from '../global/global.module';
import { MovementsModule } from '../movements/movements.module';

@NgModule({
  declarations: [StartWorkoutComponent],
  imports: [
    CommonModule,
    GlobalModule,
    MovementsModule, // TODO: Create a lighter movements module with components that may be used in other places?
    RouterModule.forChild([
      { path: '', component: StartWorkoutComponent, title: 'Start new workout' },
    ]),
  ],
})
export class WorkoutModule {}
