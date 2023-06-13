import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkoutWeightliftingComponent } from './workout-weightlifting.component';

describe('WorkoutWeightliftingComponent', () => {
  let component: WorkoutWeightliftingComponent;
  let fixture: ComponentFixture<WorkoutWeightliftingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkoutWeightliftingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkoutWeightliftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
