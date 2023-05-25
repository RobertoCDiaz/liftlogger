import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorForm, CreatorPageComponent } from './creator-page.component';
import { getComponent, getComponents } from 'src/app/helpers/testing.helper';
import { AppModule } from 'src/app/app.module';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CreatorInputComponent } from '../creator-input/creator-input.component';
import { ButtonComponent } from '../button/button.component';

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;

  const actionButtonId: string = '#actionButton';

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
    const button: ButtonComponent = getComponent(fixture, actionButtonId).componentInstance;

    component.createEnabled = false;
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();

    component.createEnabled = true;
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('should init with creation disabled by default', () => {
    const button: ButtonComponent = getComponent(fixture, actionButtonId).componentInstance;

    expect(button.disabled).toBeTrue();
  });

  it('should execute triggerPageAction() event when create button is clicked', () => {
    const createButton = getComponent(fixture, actionButtonId);
    const spy = spyOn(component, 'triggerPageAction');

    createButton.triggerEventHandler('onClicked');

    expect(spy).toHaveBeenCalled();
  });

  it("should update title in form with the title input's value when it changes", () => {
    const titleInput = getComponent(fixture, '#titleInput');
    const testTitles: string[] = ['This is a test title', 'Another title   ', 'Last title'];

    testTitles.forEach(title => {
      titleInput.triggerEventHandler('valueChanged', title);

      expect(component.pageForm.value.title).toBe(title);
    });
  });

  it("should emit descriptionChanged with the description input's value when it changes", () => {
    const descriptionInput = getComponent(fixture, '#descriptionInput');
    const testDescriptions: string[] = [
      'This is a test description',
      'Another description   ',
      'Last description',
    ];

    testDescriptions.forEach(description => {
      descriptionInput.triggerEventHandler('valueChanged', description);

      expect(component.pageForm.value.description).toBe(description);
    });
  });

  describe('formChanged EventEmitted', () => {
    it('should emit the page form when it changes', () => {
      let emittedValue: CreatorForm | null = null;
      component.formChanged.subscribe(form => {
        emittedValue = form;
      });

      component.pageForm.patchValue({ title: 'testing title' });
      expect(emittedValue!.value.title).toBe('testing title');

      component.pageForm.patchValue({ description: 'just a description' });
      expect(emittedValue!.value.description).toBe('just a description');
    });
  });

  describe('triggerPageAction()', () => {
    it('should trigger onCreate event by default', () => {
      component.triggerPageAction();

      component.onCreate.subscribe(expect(true).toBeTrue());
    });
    it('should trigger onUpdate event when uppdate operation is being made', () => {
      component.updateFormData.isUpdate = true;

      component.triggerPageAction();

      component.onUpdate.subscribe(expect(true).toBeTrue());
    });
  });

  it('should put original data in inputs when update operation', () => {
    const testTitle = 'Test title';
    const testDescription = 'Test description of a Template that will be updated';
    component.updateFormData = {
      isUpdate: true,
      originalData: {
        title: testTitle,
        description: testDescription,
      },
    };

    const titleComponent: CreatorInputComponent = getComponent(
      fixture,
      'app-creator-input#titleInput',
    ).componentInstance;
    const descriptionComponent: CreatorInputComponent = getComponent(
      fixture,
      'app-creator-input#descriptionInput',
    ).componentInstance;

    expect(titleComponent.value).toBe(testTitle);
    expect(descriptionComponent.value).toBe(testDescription);
  });
});
