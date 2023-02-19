import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightscaleDataInputComponent } from './weightscale-data-input.component';

describe('WeightscaleDataInputComponent', () => {
  let component: WeightscaleDataInputComponent;
  let fixture: ComponentFixture<WeightscaleDataInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeightscaleDataInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeightscaleDataInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
