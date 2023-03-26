import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMuscleGroupComponent } from './create-muscle-group.component';

describe('CreateMuscleGroupComponent', () => {
  let component: CreateMuscleGroupComponent;
  let fixture: ComponentFixture<CreateMuscleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateMuscleGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateMuscleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
