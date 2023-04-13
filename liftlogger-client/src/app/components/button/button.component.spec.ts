import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonComponent } from './button.component';
describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute onButtonClicked when button element is clicked', () => {
    spyOn(component, 'onButtonClicked');

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onButtonClicked).toHaveBeenCalled();
  });

  it('should emmit onClicked event if component is not disabled', () => {
    component.disabled = false;

    let emitted: boolean = false;
    component.onClicked.subscribe(() => {
      emitted = true;
    });

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toBeTrue();
  });

  it('should NOT emmit onClicked event if component is disabled', () => {
    component.disabled = true;

    let emitted: boolean = false;
    component.onClicked.subscribe(() => {
      emitted = true;
    });

    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(emitted).toBeFalse();
  });

  it('should not render the icon element if `icon` property is not specified', () => {
    const iconElement = fixture.debugElement.nativeElement.querySelector('span.material-icons');

    expect(iconElement).toBeFalsy();
  });

  it('should render the icon element if `icon` property is set', () => {
    component.icon = 'home';
    fixture.detectChanges();

    const iconElement = fixture.debugElement.nativeElement.querySelector('#icon');

    expect(iconElement).toBeTruthy();
  });

  it('should render an <a> tag if an href is set', () => {
    component.href = '/dashboard';
    fixture.detectChanges();

    const anchorElement = fixture.debugElement.nativeElement.querySelector('a');
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(anchorElement).toBeTruthy();
    expect(buttonElement).toBeFalsy();
  });

  it('should render an <button> tag if an href is not specified', () => {
    fixture.detectChanges();

    const anchorElement = fixture.debugElement.nativeElement.querySelector('a');
    const buttonElement = fixture.debugElement.nativeElement.querySelector('button');

    expect(anchorElement).toBeFalsy();
    expect(buttonElement).toBeTruthy();
  });

  it('should be a submit button if isSubmitButton equals true', () => {
    component.isSubmitButton = true;
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.type).not.toBe('button');
    expect(buttonElement.type).toBe('submit');
  });

  it('should NOT be a submit button if isSubmitButton equals false', () => {
    fixture.detectChanges();

    const buttonElement: HTMLButtonElement =
      fixture.debugElement.nativeElement.querySelector('button');

    expect(buttonElement.type).not.toBe('submit');
    expect(buttonElement.type).toBe('button');
  });
});
