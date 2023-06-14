import { Component, ViewChild } from '@angular/core';
import { WeightliftingTimerComponent } from 'src/app/components/weightlifting-timer/weightlifting-timer.component';

@Component({
  selector: 'app-workout-weightlifting',
  templateUrl: './workout-weightlifting.component.html',
  styleUrls: ['./workout-weightlifting.component.sass'],
})
export class WorkoutWeightliftingComponent {
  @ViewChild('timer') timer: WeightliftingTimerComponent;
}
