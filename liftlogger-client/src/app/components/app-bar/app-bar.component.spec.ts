import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppBarComponent } from './app-bar.component';

describe('AppBarComponent', () => {
  let component: AppBarComponent;
  let fixture: ComponentFixture<AppBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render specified title', () => {
    const titleElement: HTMLHeadingElement =
      fixture.debugElement.nativeElement.querySelector('h1.title');

    expect(titleElement.textContent?.trim()).toBe('LiftLogger');

    const titles: string[] = ['Second title', 'Other title', 'Last title'];
    titles.forEach(title => {
      component.title = title;
      fixture.detectChanges();

      expect(titleElement.textContent?.trim()).toBe(title);
    });
  });

  it('should fire menuClicked when menu button is clicked', () => {
    let emitted = false;
    component.menuClicked.subscribe(() => {
      emitted = true;
    });

    const menuElement = fixture.debugElement.nativeElement.querySelector('#menu');
    menuElement.click();

    expect(emitted).toBeTrue();
  });

  it('should NOT fire menuClicked when menu button is clicked if hideMenu was set to true', () => {
    let emitted = false;
    component.menuClicked.subscribe(() => {
      emitted = true;
    });

    component.hideMenu = true;
    fixture.detectChanges();

    const menuElement = fixture.debugElement.nativeElement.querySelector('#menu');
    menuElement.click();

    expect(emitted).toBeFalse();
  });

  it('should render action button if actionurl specified', () => {
    component.actionUrl = '/create';
    fixture.detectChanges();

    const actionElement = fixture.debugElement.nativeElement.querySelector('a');
    expect(actionElement).toBeTruthy();
  });

  it('should NOT render action button if actionurl not set', () => {
    const actionElement = fixture.debugElement.nativeElement.querySelector('a');

    expect(actionElement).toBeFalsy();
  });
});
