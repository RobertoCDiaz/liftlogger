import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightscaleDataInputComponent } from './weightscale-data-input.component';
import { AppModule } from 'src/app/app.module';

describe('WeightscaleDataInputComponent', () => {
  let component: WeightscaleDataInputComponent;
  let fixture: ComponentFixture<WeightscaleDataInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightscaleDataInputComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WeightscaleDataInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
