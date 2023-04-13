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
});
