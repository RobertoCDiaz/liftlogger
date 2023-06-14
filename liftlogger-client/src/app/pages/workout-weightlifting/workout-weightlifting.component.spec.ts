import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutWeightliftingComponent } from './workout-weightlifting.component';
import { AppModule } from 'src/app/app.module';
import { WorkoutModule } from 'src/app/modules/workout/workout.module';

describe('WorkoutWeightliftingComponent', () => {
  let component: WorkoutWeightliftingComponent;
  let fixture: ComponentFixture<WorkoutWeightliftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutWeightliftingComponent],
      imports: [AppModule, WorkoutModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutWeightliftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
