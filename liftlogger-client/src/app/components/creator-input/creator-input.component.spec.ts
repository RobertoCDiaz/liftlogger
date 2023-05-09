import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorInputComponent } from './creator-input.component';
import { FormsModule } from '@angular/forms';
import { getElement } from 'src/app/helpers/testing.helper';

describe('CreatorInputComponent', () => {
  let component: CreatorInputComponent;
  let fixture: ComponentFixture<CreatorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [CreatorInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an <input> by default', () => {
    const textareaElement = getElement(fixture, 'textarea');
    const inputElement = getElement(fixture, 'input');

    expect(textareaElement).toBeFalsy();
    expect(inputElement).toBeTruthy();
  });

  it('should render a <textarea> if isTextArea equals true', () => {
    component.isTextArea = true;

    const textareaElement = getElement(fixture, 'textarea');
    const inputElement = getElement(fixture, 'input');

    expect(textareaElement).toBeTruthy();
    expect(inputElement).toBeFalsy();
  });

  it('should render an <input> if isTextArea equals false', () => {
    component.isTextArea = false;

    const textareaElement = getElement(fixture, 'textarea');
    const inputElement = getElement(fixture, 'input');

    expect(textareaElement).toBeFalsy();
    expect(inputElement).toBeTruthy();
  });

  it('should change the placeholder of the input/textarea', () => {
    const inputElement: HTMLInputElement | HTMLTextAreaElement = getElement(
      fixture,
      '#inputElement',
    );

    const placeholders: string[] = ['Insert a new value...', 'another placeholder', 'last'];

    placeholders.forEach(placeholder => {
      component.placeholder = placeholder;
      fixture.detectChanges();

      expect(inputElement.placeholder).toBe(placeholder);
    });
  });

  it('should add the title class to the input/textarea when isTitle equals true', () => {
    const inputElement: HTMLInputElement | HTMLTextAreaElement = getElement(
      fixture,
      '#inputElement',
    );

    let classes = Array.from(inputElement.classList);

    expect(classes).not.toContain('title');

    component.isTitle = true;
    fixture.detectChanges();

    classes = Array.from(inputElement.classList);

    expect(classes).toContain('title');
  });

  describe('valueChanged event', () => {
    const values: string[] = [
      'This is a testing value for the input/textarea',
      'Another test value',
      ' Last value   ',
    ];

    it('should be emitted when <input> value changes', () => {
      component.isTextArea = false;

      const input: HTMLInputElement = getElement(fixture, 'input');
      const valueChangedSpy = spyOn(component.valueChanged, 'emit');

      values.forEach(val => {
        input.value = val;
        input.dispatchEvent(new Event('input'));

        expect(valueChangedSpy).toHaveBeenCalledWith(val);
      });
    });

    it('should be emitted when <textarea> value changes', () => {
      component.isTextArea = true;

      const input: HTMLTextAreaElement = getElement(fixture, 'textarea');
      const valueChangedSpy = spyOn(component.valueChanged, 'emit');

      values.forEach(val => {
        input.value = val;
        input.dispatchEvent(new Event('input'));

        expect(valueChangedSpy).toHaveBeenCalledWith(val);
      });
    });
  });
});
