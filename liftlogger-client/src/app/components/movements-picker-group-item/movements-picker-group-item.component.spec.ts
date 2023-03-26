import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsPickerGroupItemComponent } from './movements-picker-group-item.component';

describe('MovementsPickerGroupItemComponent', () => {
  let component: MovementsPickerGroupItemComponent;
  let fixture: ComponentFixture<MovementsPickerGroupItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementsPickerGroupItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPickerGroupItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
