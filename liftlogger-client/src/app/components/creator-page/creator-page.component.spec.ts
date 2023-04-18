import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPageComponent } from './creator-page.component';
import { getComponent, getComponents } from 'src/app/helpers/testing.helper';
import { AppModule } from 'src/app/app.module';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CreatorInputComponent } from '../creator-input/creator-input.component';
import { ButtonComponent } from '../button/button.component';

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorPageComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render page header', () => {
    const pageHeader = getComponent(fixture, 'app-page-header');

    expect(pageHeader).toBeTruthy();
  });

  it('should pass the title as page title to the page-header', () => {
    const titles: string[] = ['Creator page title', 'another title for testing', 'last title'];

    const pageHeader: PageHeaderComponent = getComponent(
      fixture,
      'app-page-header',
    ).componentInstance;

    titles.forEach(title => {
      component.title = title;
      fixture.detectChanges();

      expect(pageHeader.pageTitle).toBe(title);
    });
  });

  it('should render both the title input and description input', () => {
    const inputs = getComponents(fixture, 'app-creator-input');

    expect(inputs).toHaveSize(2);
  });

  it('should set the title input placeholder', () => {
    const placeholders: string[] = [
      'testing placeholder 1',
      'title placeholder    ',
      'last placeholder',
    ];

    const titleInput: CreatorInputComponent = getComponent(
      fixture,
      '#titleInput',
    ).componentInstance;

    placeholders.forEach(placeholder => {
      component.inputTitle = placeholder;
      fixture.detectChanges();

      expect(titleInput.placeholder).toBe(placeholder + '...');
    });
  });

  it('should disable and enable the create button', () => {
    const button: ButtonComponent = getComponent(fixture, '#createButton').componentInstance;

    component.createEnabled = false;
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();

    component.createEnabled = true;
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('should init with creation disabled by default', () => {
    const button: ButtonComponent = getComponent(fixture, '#createButton').componentInstance;

    expect(button.disabled).toBeTrue();
  });

  it('should emit the onCreate event when create button is clicked', () => {
    const createButton = getComponent(fixture, '#createButton');

    let emitted = false;
    component.onCreate.subscribe(() => {
      emitted = true;
    });

    createButton.triggerEventHandler('onClicked');

    expect(emitted).toBeTrue();
  });

  it("should emit titleChanged with the title input's value when it changes", () => {
    const titleInput = getComponent(fixture, '#titleInput');
    const testTitles: string[] = ['This is a test title', 'Another title   ', 'Last title'];

    let emittedValue: string;
    component.titleChanged.subscribe(titleValue => {
      emittedValue = titleValue;
    });

    testTitles.forEach(title => {
      titleInput.triggerEventHandler('valueChanged', title);

      expect(emittedValue).toBe(title);
    });
  });

  it("should emit descriptionChanged with the description input's value when it changes", () => {
    const descriptionInput = getComponent(fixture, '#descriptionInput');
    const testDescriptions: string[] = [
      'This is a test description',
      'Another description   ',
      'Last description',
    ];

    let emittedValue: string;
    component.descriptionChanged.subscribe(descriptionValue => {
      emittedValue = descriptionValue;
    });

    testDescriptions.forEach(description => {
      descriptionInput.triggerEventHandler('valueChanged', description);

      expect(emittedValue).toBe(description);
    });
  });
});
