import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTemplateComponent, CreateTemplateComponentState } from './create-template.component';
import { BehaviorSubject, of, skip } from 'rxjs';
import { Movement } from 'src/app/models/MovementModel';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import {
  CreatorPageComponent,
  CreatorPageState,
} from 'src/app/components/creator-page/creator-page.component';
import { AppModule } from 'src/app/app.module';
import { TemplatesService } from 'src/app/services/templates.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { getTemplatesFixture } from 'src/app/fixtures/templates.fixture';
import { Template } from 'src/app/models/TemplateModel';
import { getComponent } from 'src/app/helpers/testing.helper';
import { Location } from '@angular/common';

describe('CreateTemplateComponentState', () => {
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
  let creatorPageState: CreatorPageState;

  let templateService: TemplatesService;
  let router: Router;
  let location: Location;
  let activatedRoute: ActivatedRoute;

  let alertSpy: jasmine.Spy;
  let navigateSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateTemplateComponentState, CreatorPageState],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
    creatorPageState = fixture.debugElement.injector.get(CreatorPageState);
    templateService = TestBed.inject(TemplatesService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    activatedRoute = TestBed.inject(ActivatedRoute);

    alertSpy = spyOn(window, 'alert');
    navigateSpy = spyOn(location, 'back');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    const templateId = 2;
    const testTemplate = getTemplatesFixture()[0];

    let idSpy: jasmine.Spy;
    let routerUrlSpy: jasmine.Spy;
    let getTemplateSpy: jasmine.Spy;

    beforeEach(() => {
      idSpy = spyOnProperty(activatedRoute, 'paramMap').and.returnValue(
        of(convertToParamMap({ id: templateId })),
      );
      routerUrlSpy = spyOnProperty(router, 'url').and.returnValue(
        'https://liflogger-test.com/templates/update/' + templateId,
      );
      getTemplateSpy = spyOn(templateService, 'getTemplate').and.returnValue(of(testTemplate));
    });

    it('should properly set update state when update url is being used and valid template id', () => {
      component.ngOnInit();

      expect(creatorPageState.updateState.isUpdate).toBeTrue();
      expect(creatorPageState.getFormValues()).toEqual({
        title: testTemplate.name,
        description: testTemplate.description! ?? '',
      });
    });

    it('should redirect to /templates if not template found', () => {
      getTemplateSpy.and.returnValue(of()).and.throwError('Not found');

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should redirect to /templates if no valid id', () => {
      idSpy.and.returnValue(of(convertToParamMap({ id: 'not-valid' })));

      component.ngOnInit();

      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should set update operation as false not in update path', () => {
      routerUrlSpy.and.returnValue('https://liflogger-test.com/templates/create');

      component.ngOnInit();

      expect(creatorPageState.updateState.isUpdate).toBeFalse();
    });
  });

  describe('createTemplate()', () => {
    let testTemplate: Template;
    const testTitle: string = 'test title';
    const testDescription: string = 'test description';

    beforeEach(() => {
      testTemplate = getTemplatesFixture()[0];
    });

    it('should try to create template using service', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));
      spyOn(state, 'getMovements').and.returnValue(of(getMovementsFixture()));

      creatorPageState['form'].setValue({
        title: testTitle,
        description: testDescription,
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

      creatorPageState['form'].setValue({
        title: testTitle,
        description: 'testDescription',
      });

      await component.createTemplate();

      expect(spy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should create even if no movements provided', async () => {
      let spy = spyOn(templateService, 'createTemplate').and.returnValue(of(testTemplate));
      spyOn(state, 'getMovements').and.returnValue(of([]));

      creatorPageState['form'].setValue({
        title: testTitle,
        description: testDescription,
      });

      await component.createTemplate();

      expect(spy).toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('updateTemplate()', () => {
    const testId: number = 57;
    const movsIs: number[] = [1, 7, 23];
    const testTitle = 'Test Title';
    const testDescription: string = 'Test Description';

    const resultTemplate: Template = getTemplatesFixture()[0];

    let updateSpy: jasmine.Spy;
    let getIdsSpy: jasmine.Spy;

    beforeEach(() => {
      updateSpy = spyOn(templateService, 'updateTemplate').and.returnValue(of(resultTemplate));

      creatorPageState['form'].setValue({
        title: testTitle,
        description: testDescription,
      });

      getIdsSpy = component['getMovementsIds'] = jasmine.createSpy().and.returnValue(of(movsIs));
    });

    it('should use service to try and update a template', () => {
      component.updateTemplate(testId);

      expect(updateSpy).toHaveBeenCalledWith(
        testId,
        {
          name: creatorPageState.getFormValues().title!,
          description: creatorPageState.getFormValues().description!,
        },
        movsIs,
      );
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });

    it('should not call update if no title', () => {
      creatorPageState['form'].setValue({
        title: '',
        description: testDescription,
      });

      component.updateTemplate(testId);

      expect(alertSpy).toHaveBeenCalledWith('You have missing information');
    });

    it('should update even if no description', () => {
      creatorPageState['form'].setValue({
        title: testTitle,
        description: '',
      });

      component.updateTemplate(testId);

      expect(updateSpy).toHaveBeenCalledWith(
        testId,
        {
          name: creatorPageState.getFormValues().title!,
          description: undefined,
        },
        movsIs,
      );
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });
    it('should update even if no movements', () => {
      getIdsSpy.and.returnValue(of([]));

      component.updateTemplate(testId);

      expect(updateSpy).toHaveBeenCalledWith(
        testId,
        {
          name: testTitle,
          description: testDescription,
        },
        [],
      );
      expect(alertSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalled();
    });
  });

  describe('deleteTemplate', () => {
    const testId: number = 23;

    let deleteSpy: jasmine.Spy;

    beforeEach(() => {
      deleteSpy = spyOn(templateService, 'deleteTemplate').and.returnValue(of());
    });

    it('should call service to delete template if user confirms deletion', async () => {
      spyOn(window, 'confirm').and.returnValue(true);

      await component.deleteTemplate(testId);

      expect(deleteSpy).toHaveBeenCalled();
    });

    it("should not call service to delete template if user doesn't confirm deletion", async () => {
      spyOn(window, 'confirm').and.returnValue(false);

      await component.deleteTemplate(testId);

      expect(deleteSpy).not.toHaveBeenCalled();
    });
  });

  describe('getMovementsIds()', () => {
    it('should transform movements list to ids list', () => {
      const movements = getMovementsFixture();
      const ids = movements.map(m => m.id);
      const movs$ = of(movements);

      const result = component['getMovementsIds'](movs$);

      result.subscribe(resultValue => {
        expect(resultValue).toEqual(ids);
      });
    });
  });

  describe('HTML View', () => {
    it('should not enable creation if no title provided', () => {
      const creatorPage: CreatorPageComponent = getComponent(
        fixture,
        'app-creator-page',
      ).componentInstance;

      expect(creatorPage.createEnabled).toBeFalse();

      creatorPageState.setFormValues({ title: 'Test Title', description: '' });
      fixture.detectChanges();

      expect(creatorPage.createEnabled).toBeTrue();
    });
  });
});
