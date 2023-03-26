import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerComponent } from './movements-picker.component';

describe('MovementsPickerComponent', () => {
  let component: MovementsPickerComponent;
  let fixture: ComponentFixture<MovementsPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
