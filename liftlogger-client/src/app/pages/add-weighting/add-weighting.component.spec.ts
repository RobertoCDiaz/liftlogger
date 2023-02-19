import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeightingComponent } from './add-weighting.component';

describe('AddWeightingComponent', () => {
  let component: AddWeightingComponent;
  let fixture: ComponentFixture<AddWeightingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWeightingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddWeightingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
