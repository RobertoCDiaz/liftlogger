import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightscaleDataInputComponent } from './weightscale-data-input.component';
import { AppModule } from 'src/app/app.module';
import { getElement } from 'src/app/helpers/testing.helper';
import { FormControl, FormGroup } from '@angular/forms';

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

    component.formGroup = new FormGroup({ weight: new FormControl() });
    component.formProperty = 'weight';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the specified label for the input', () => {
    const testLabel: string = 'This is a testing label';

    component.label = testLabel;

    const labelEl: HTMLParagraphElement = getElement(fixture, 'p.name');

    expect(labelEl.textContent?.trim()).toBe(testLabel);
  });

  describe('Input Element', () => {
    it('should update the form control value', () => {
      const input = fixture.nativeElement.querySelector('.data-input');
      input.value = '10';
      input.dispatchEvent(new Event('input'));
      expect(component.formGroup.get('weight')!.value).toBe('10');
    });

    it('should have a form control with the correct name', () => {
      expect(component.formGroup.get('weight')).toBeTruthy();
    });
  });
});
