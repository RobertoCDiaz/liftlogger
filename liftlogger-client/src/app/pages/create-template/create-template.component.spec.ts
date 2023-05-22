import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTemplateComponent, CreateTemplateComponentState } from './create-template.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { Movement } from 'src/app/models/MovementModel';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { CreatorForm } from 'src/app/components/creator-page/creator-page.component';
import { AppModule } from 'src/app/app.module';
import { TemplatesService } from 'src/app/services/templates.service';
import { Router } from '@angular/router';
import { getTemplatesFixture } from 'src/app/fixtures/templates.fixture';
import { Template } from 'src/app/models/TemplateModel';

describe('CreateTemplateComponent', () => {
  let state: CreateTemplateComponentState;

  beforeEach(() => {
    state = new CreateTemplateComponentState();
  });

  describe('getMovements()', () => {
    it('should return an observable to movementsSubject', () => {
      const testMovements = getMovementsFixture();
      state['movementsSubject'] = new BehaviorSubject<Movement[]>(testMovements);

      state.getMovements().subscribe(result => {
        expect(result).toEqual(testMovements);
      });
    });
  });

  describe('addMovements()', () => {
    it('should add movements to state list', () => {
      const testMovements = getMovementsFixture();
      const originalMovements = testMovements.slice(0, 2);
      const newMovement = testMovements[2];
      const newMovement2 = testMovements[3];

      state['movementsSubject'] = new BehaviorSubject<Movement[]>(originalMovements);

      state.addMovements(newMovement, newMovement2);

      expect(state['movementsSubject'].value).toEqual(testMovements);
    });

    it('should not add repeated movements', () => {
      const testMovements = getMovementsFixture();
      const newMovement = getMovementsFixture()[2];

      state['movementsSubject'] = new BehaviorSubject<Movement[]>(testMovements);

      state.addMovements(newMovement);

      expect(state['movementsSubject'].value).toEqual(testMovements);
    });
  });

  describe('removeMovement()', () => {
    it("should remove a movement from the state's list", () => {
      const testMovements = getMovementsFixture();
      const movementToRemove = getMovementsFixture()[1];

      state['movementsSubject'] = new BehaviorSubject<Movement[]>(testMovements);

      state.removeMovement(movementToRemove);

      expect(state['movementsSubject'].value).toEqual(
        testMovements.filter(m => m.id !== movementToRemove.id),
      );
    });
  });

  describe('moveMovement()', () => {
    it('should reorder movements', () => {
      const originalList = getMovementsFixture();

      state['movementsSubject'] = new BehaviorSubject<Movement[]>(
        JSON.parse(JSON.stringify(originalList)),
      );

      state.moveMovement(1, 0);

      expect(state['movementsSubject'].value[0]).toEqual(originalList[1]);
    });
  });
});

describe('CreateTemplateComponent', () => {
  let component: CreateTemplateComponent;
  let fixture: ComponentFixture<CreateTemplateComponent>;

  let state: CreateTemplateComponentState;

  let templateService: TemplatesService;
  let router: Router;

  let alertSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateTemplateComponentState],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
    templateService = TestBed.inject(TemplatesService);
    router = TestBed.inject(Router);

    alertSpy = spyOn(window, 'alert');
    navigateSpy = spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('createTemplate', () => {
    let testTemplate: Template;
    const testTitle: string = 'test title';
    const testDescription: string = 'test description';

    beforeEach(() => {
      testTemplate = getTemplatesFixture()[0];
    });

    it('should try to create template using service', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));
      spyOn(state, 'getMovements').and.returnValue(of(getMovementsFixture()));
      component.templateForm = new FormGroup({
        title: new FormControl<string | null>(testTitle),
        description: new FormControl<string | null>(testDescription),
      });

      await component.createTemplate();

      expect(spy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should prevent creation if no title submitted', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));

      await component.createTemplate();

      expect(spy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).not.toHaveBeenCalled();
    });

    it('should create even if no description provided', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));
      component.templateForm = new FormGroup({
        title: new FormControl<string | null>(testTitle, { validators: Validators.required }),
        description: new FormControl<string | null>(null),
      });

      await component.createTemplate();

      expect(spy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should create even if no movements provided', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));
      spyOn(state, 'getMovements').and.returnValue(of([]));
      component.templateForm = new FormGroup({
        title: new FormControl<string | null>(testTitle),
        description: new FormControl<string | null>(testDescription),
      });

      await component.createTemplate();

      expect(spy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('handleFormChanged()', () => {
    it('should set local form to provided form', () => {
      const testTitle: string = 'Test Name';
      const testDescription: string =
        'This is just some testing information to test the Template creation page';

      const formMock: CreatorForm = new FormGroup({
        title: new FormControl<string | null>(testTitle, { validators: Validators.required }),
        description: new FormControl<string | null>(testDescription, {
          validators: Validators.required,
        }),
      });

      component.handleFormChanged(formMock);

      expect(component.templateForm.value.title).toBe(testTitle);
      expect(component.templateForm.value.description).toBe(testDescription);
    });
  });
});
