import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorPageComponent, CreatorPageState, UpdateState } from './creator-page.component';
import { getComponent, getComponents, getElement } from 'src/app/helpers/testing.helper';
import { AppModule } from 'src/app/app.module';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { CreatorInputComponent } from '../creator-input/creator-input.component';
import { ButtonComponent } from '../button/button.component';

describe('CreatorPageState', () => {
  let state: CreatorPageState;

  const testTitle = 'Test Title';
  const testDescription = 'Just a testing description';

  beforeEach(() => {
    state = new CreatorPageState();
  });

  describe('setFormValues()', () => {
    it('can replace form values', () => {
      state.setFormValues({
        title: testTitle,
        description: testDescription,
      });

      expect(state['form'].value).toEqual({
        title: testTitle,
        description: testDescription,
      });
    });

    it('can only set the title', () => {
      state.setFormValues({ title: testTitle });

      expect(state['form'].value).toEqual({
        title: testTitle,
        description: '',
      });
    });

    it('can only set the description', () => {
      state.setFormValues({ description: testDescription });

      expect(state['form'].value).toEqual({
        title: '',
        description: testDescription,
      });
    });
  });

  describe('getFormValues()', () => {
    it('should get current form values', () => {
      state['form'].setValue({
        title: testTitle,
        description: testDescription,
      });

      const result = state.getFormValues();

      expect(result).toEqual({
        title: testTitle,
        description: testDescription,
      });
    });

    it('should be empty if empty title and description', () => {
      state['form'].setValue({
        title: '',
        description: '',
      });

      const result = state.getFormValues();

      expect(result).toEqual({});
    });

    it('should not include an empty title', () => {
      state['form'].setValue({
        title: '',
        description: testDescription,
      });

      const result = state.getFormValues();

      expect(result).toEqual({
        description: testDescription,
      });
    });

    it('should not include an empty description', () => {
      state['form'].setValue({
        title: testTitle,
        description: '',
      });

      const result = state.getFormValues();

      expect(result).toEqual({
        title: testTitle,
      });
    });
  });

  describe('isFormValid()', () => {
    it('should return true if a title is provided', () => {
      state['form'].setValue({
        title: testTitle,
        description: '',
      });

      const result = state.isFormValid();

      expect(result).toBeTrue();
    });

    it('should return false if no title is provided', () => {
      state['form'].setValue({
        title: '',
        description: '',
      });

      const result = state.isFormValid();

      expect(result).toBeFalse();
    });

    it('should return true if description is provided when required', () => {
      state['form'].setValue({
        title: testTitle,
        description: testDescription,
      });

      const result = state.isFormValid(true);

      expect(result).toBeTrue();
    });

    it('should return false if no description is provided when required', () => {
      state['form'].setValue({
        title: testTitle,
        description: '',
      });

      const result = state.isFormValid(true);

      expect(result).toBeFalse();
    });
  });

  describe('formValueChanges$()', () => {
    it('should react to form changes and pass the values', () => {
      state.formValueChanges$().subscribe(values => {
        expect(values.title).toBe(testTitle);
        expect(values.description).toBe(testDescription);
      });

      state['form'].setValue({
        title: testTitle,
        description: testDescription,
      });
    });
  });
});

describe('CreatorPageComponent', () => {
  let component: CreatorPageComponent;
  let fixture: ComponentFixture<CreatorPageComponent>;
  let state: CreatorPageState;

  const actionButtonId: string = '#actionButton';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreatorPageComponent],
      imports: [AppModule],
      providers: [CreatorPageState],
    }).compileComponents();

    fixture = TestBed.createComponent(CreatorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = TestBed.inject(CreatorPageState);
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

  it('should disable and enable the action button when creating', () => {
    state.updateState.isUpdate = false;
    const button: ButtonComponent = getComponent(fixture, actionButtonId).componentInstance;

    component.createEnabled = false;
    fixture.detectChanges();

    expect(button.disabled).toBeTrue();

    component.createEnabled = true;
    fixture.detectChanges();

    expect(button.disabled).toBeFalse();
  });

  it('should always enable action button if update operation', () => {
    state.updateState.isUpdate = true;
    component.createEnabled = false;
    const button: ButtonComponent = getComponent(fixture, actionButtonId).componentInstance;

    expect(button.disabled).toBeFalse();

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

      expect(state.getFormValues().title).toBe(title);
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

      expect(state.getFormValues().description).toBe(description);
    });
  });

  describe('triggerPageAction()', () => {
    it('should trigger onCreate event by default', () => {
      component.triggerPageAction();

      component.onCreate.subscribe(expect(true).toBeTrue());
    });
    it('should trigger onUpdate event when uppdate operation is being made', () => {
      state.updateState.isUpdate = true;

      component.triggerPageAction();

      component.onUpdate.subscribe(expect(true).toBeTrue());
    });
  });

  it('should put original data in inputs when update operation', () => {
    const testTitle = 'Test title';
    const testDescription = 'Test description of a Template that will be updated';
    state.updateState.isUpdate = true;
    state.setFormValues({ title: testTitle, description: testDescription });

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

  describe('triggerDeleteEvent()', () => {
    it('should emit object id through the onDelete event if update operation', () => {
      const testId = 34;
      state.updateState = { isUpdate: true, objectId: testId };

      let emittedId: number = -1;
      component.onDelete.subscribe(value => {
        emittedId = value;
      });

      component.triggerDeleteEvent();

      expect(emittedId).toBe(testId);
    });

    it('should not emit onDelete event if not update operation', () => {
      state.updateState = { isUpdate: false };

      let flag = false;
      component.onDelete.subscribe(_ => {
        flag = true;
      });

      component.triggerDeleteEvent();

      expect(flag).toBeFalse();
    });
  });

  it('should render delete button if update operation', () => {
    state.updateState = { isUpdate: true } as UpdateState;
    const deleteBtn: HTMLSpanElement = getElement(fixture, '.delete-button');

    expect(deleteBtn).toBeTruthy();
  });

  it('should not render delete button if create operation', () => {
    state.updateState = { isUpdate: false };
    const deleteBtn: HTMLSpanElement = getElement(fixture, '.delete-button');

    expect(deleteBtn).toBeFalsy();
  });
});
