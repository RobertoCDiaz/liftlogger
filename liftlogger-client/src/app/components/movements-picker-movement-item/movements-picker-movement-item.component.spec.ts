import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerMovementItemComponent } from './movements-picker-movement-item.component';

describe('MovementsPickerMovementItemComponent', () => {
  let component: MovementsPickerMovementItemComponent;
  let fixture: ComponentFixture<MovementsPickerMovementItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementsPickerMovementItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementsPickerMovementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
