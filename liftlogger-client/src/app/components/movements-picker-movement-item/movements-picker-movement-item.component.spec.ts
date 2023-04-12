import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerMovementItemComponent } from './movements-picker-movement-item.component';
import { MovementsPickerState } from '../movements-picker/movements-picker.component';

describe('MovementsPickerMovementItemComponent', () => {
  let component: MovementsPickerMovementItemComponent;
  let fixture: ComponentFixture<MovementsPickerMovementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerMovementItemComponent],
      providers: [MovementsPickerState],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPickerMovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
