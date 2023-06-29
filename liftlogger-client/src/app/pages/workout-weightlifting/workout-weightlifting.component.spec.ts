import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartFrom, WorkoutWeightliftingComponent } from './workout-weightlifting.component';
import { AppModule } from 'src/app/app.module';
import { WorkoutModule } from 'src/app/modules/workout/workout.module';
import { TemplatesService } from 'src/app/services/templates.service';
import { MovementsService } from 'src/app/services/movements.service';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';
import { getTemplatesFixture } from 'src/app/fixtures/templates.fixture';
import { Template } from 'src/app/models/TemplateModel';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { Movement, MovementToTemplateModel } from 'src/app/models/MovementModel';
import {
  getComponent,
  getComponents,
  getElement,
  getElements,
} from 'src/app/helpers/testing.helper';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { LiftingSetCreationParams } from 'src/app/models/LiftingSetModel';
import { MovementJournalsService } from 'src/app/services/movement-journals.service';
import { getEntriesFixture } from 'src/app/fixtures/movements-journals.fixture';
import { MovementJournalEntryComponent } from 'src/app/components/movement-journal-entry/movement-journal-entry.component';
import { getMovementNotesFixture } from 'src/app/fixtures/movements-notes.fixture';

describe('WorkoutWeightliftingComponent', () => {
  let component: WorkoutWeightliftingComponent;
  let fixture: ComponentFixture<WorkoutWeightliftingComponent>;

  let templatesService: TemplatesService;
  let movementsService: MovementsService;
  let journalService: MovementJournalsService;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkoutWeightliftingComponent],
      imports: [AppModule, WorkoutModule],
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutWeightliftingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    templatesService = TestBed.inject(TemplatesService);
    movementsService = TestBed.inject(MovementsService);
    journalService = TestBed.inject(MovementJournalsService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('startFrom$', () => {
    it('should get template data if provided', () => {
      const params: StartFrom = { type: 'template', id: 4 };

      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.startFrom$);

      expect(spy.getLastValue()?.type).toBe('template');
      expect(spy.getLastValue()?.id).toBe(4);
    });

    it('should get movement data if provided', () => {
      const params: StartFrom = { type: 'movement', id: 4 };

      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.startFrom$);

      expect(spy.getLastValue()?.type).toBe('movement');
      expect(spy.getLastValue()?.id).toBe(4);
    });

    it('should be null if not valid type or not id provided', () => {
      const invalidParamsList = [
        { type: 'not-valid', id: 4 },
        { type: 'not-templaet', id: 4 },
        { type: 'movementss', id: 4 },
        { type: 'template' },
        { type: 'movement' },
        { type: 'movement' },
      ];

      const routeSpy = spyOnProperty(route, 'queryParamMap');
      for (let params of invalidParamsList) {
        routeSpy.and.returnValue(of(convertToParamMap(params)));

        component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

        const spy = subscribeSpyTo(component.startFrom$);

        expect(spy.getLastValue()).toBeNull();
      }
    });
  });

  describe('template$', () => {
    it('should fetch template using service', () => {
      const testTemplate: Template = getTemplatesFixture()[0];
      const params: StartFrom = { type: 'template', id: testTemplate.id };
      spyOn(templatesService, 'getTemplate').and.returnValue(of(testTemplate));
      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.template$);

      expect(spy.getLastValue()).toEqual(testTemplate);
    });

    it('should be null if no start params provided', () => {
      const params: StartFrom = {} as StartFrom;
      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.template$);

      expect(spy.getLastValue()).toBeNull();
    });

    it('should be null if movement params provided', () => {
      const params: StartFrom = { type: 'movement', id: 3 } as StartFrom;
      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.template$);

      expect(spy.getLastValue()).toBeNull();
    });

    it('should be null if service throws error', () => {
      const params: StartFrom = { type: 'template', id: 7564 } as StartFrom;
      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));
      spyOn(templatesService, 'getTemplate').and.throwError('No template found');

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.template$);

      expect(spy.getLastValue()).toBeNull();
    });
  });

  describe('movements$', () => {
    it('should be empty if not start parameters provided', () => {
      const params = {} as StartFrom;
      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.movements$);

      expect(spy.getLastValue()).toEqual([]);
    });

    it('should get movements list from template if provided', () => {
      const params = { type: 'template', id: 1 } as StartFrom;
      const movements: Movement[] = getMovementsFixture();
      const testTemplate = {
        movements: movements.map(movement => ({ movement } as MovementToTemplateModel)),
      } as Template;

      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));
      spyOn(templatesService, 'getTemplate').and.returnValue(of(testTemplate));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.movements$);

      expect(spy.getLastValue()).toEqual(movements);
    });

    it('should be the starting movement in a list if provided', () => {
      const testMovement = getMovementsFixture()[0];
      const params = { type: 'movement', id: testMovement.id } as StartFrom;

      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));
      spyOn(movementsService, 'getMovement').and.returnValue(of(testMovement));

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.movements$);

      expect(spy.getLastValue()).toEqual([testMovement]);
    });

    it('should be empty if movement fetching throws error', () => {
      const testMovement = getMovementsFixture()[0];
      const params = { type: 'movement', id: testMovement.id } as StartFrom;

      spyOnProperty(route, 'queryParamMap').and.returnValue(of(convertToParamMap(params)));
      spyOn(movementsService, 'getMovement').and.throwError('No movement found');

      component = TestBed.createComponent(WorkoutWeightliftingComponent).componentInstance;

      const spy = subscribeSpyTo(component.movements$);

      expect(spy.getLastValue()).toEqual([]);
    });
  });

  describe('weightliftingState', () => {
    it('should start with picking-movement state', () => {
      const spy = subscribeSpyTo(component.weightliftingState$);

      expect(spy.getLastValue()).toEqual({ state: 'picking-movement' });
    });

    it('should change to working-out state when movementPickedEvent is fired', () => {
      const testMovement = getMovementsFixture()[0];
      const spy = subscribeSpyTo(component.weightliftingState$);
      component.movementPickedEvent$.next(testMovement);

      expect(spy.getLastValue()).toEqual({ state: 'working-out', currentMovement: testMovement });
    });

    it('should change to picking-movement state when pickMovementEvent is fired', () => {
      const spy = subscribeSpyTo(component.weightliftingState$);

      component.movementPickedEvent$.next({} as Movement);

      expect(spy.getLastValue()?.state).toBe('working-out');

      component.pickMovementEvent$.next();

      expect(spy.getLastValue()).toEqual({ state: 'picking-movement' });
    });
  });

  describe('sets$', () => {
    it('should start off as an empty array', () => {
      const spy = subscribeSpyTo(component.sets$);

      expect(spy.getLastValue()).toEqual([]);
    });

    it('should add a set on addSetEvent$ trigger', () => {
      const spy = subscribeSpyTo(component.sets$);
      const testMovement = getMovementsFixture()[0];

      component.addSetEvent$.emit(testMovement);

      expect(spy.getLastValue()).toHaveSize(1);
      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 1, weight: 1 }]);
    });

    it('should properly change reps of a set when repsToEvent$ trigger', () => {
      const spy = subscribeSpyTo(component.sets$);
      const testMovement = getMovementsFixture()[0];

      component.addSetEvent$.emit(testMovement);

      expect(spy.getLastValue()).toHaveSize(1);
      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 1, weight: 1 }]);

      const testSet = spy.getLastValue()![0];

      component.repsToEvent$.emit({ set: testSet, delta: 3 });

      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 4, weight: 1 }]);
    });

    it('should properly set the weight of a set when setWeightToSetEvent$ trigger', () => {
      const spy = subscribeSpyTo(component.sets$);
      const testMovement = getMovementsFixture()[0];

      component.addSetEvent$.emit(testMovement);

      expect(spy.getLastValue()).toHaveSize(1);
      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 1, weight: 1 }]);

      const testSet = spy.getLastValue()![0];

      component.setWeightToSetEvent$.emit({
        set: testSet,
        weight: { target: { value: '123' } as HTMLInputElement } as unknown as Event,
      });

      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 1, weight: 123 }]);
    });

    it('should add a set based on similar sets if a set from the same movement already exist', () => {
      const spy = subscribeSpyTo(component.sets$);
      const testMovement = getMovementsFixture()[0];

      component.addSetEvent$.emit(testMovement);

      expect(spy.getLastValue()).toHaveSize(1);
      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 1, weight: 1 }]);

      const testSet = spy.getLastValue()![0];

      component.repsToEvent$.emit({ set: testSet, delta: 3 });
      component.setWeightToSetEvent$.emit({
        set: testSet,
        weight: { target: { value: '22.5' } as HTMLInputElement } as unknown as Event,
      });

      expect(spy.getLastValue()).toEqual([{ movement_id: testMovement.id, reps: 4, weight: 22.5 }]);

      component.addSetEvent$.emit(testMovement);
      expect(spy.getLastValue()).toHaveSize(2);
      expect(spy.getLastValue()![1]).toEqual({
        movement_id: testMovement.id,
        reps: 4,
        weight: 22.5,
      });
    });
  });

  describe('currentMovementJournal$', () => {
    it('should get journal for active movement', () => {
      const spy = subscribeSpyTo(component.currentMovementJournal$);
      const testMovement = getMovementsFixture()[0];
      const testJournal = getEntriesFixture();
      spyOn(movementsService, 'getMovementJournal').and.returnValue(of(testJournal));

      component.movementPickedEvent$.emit(testMovement);

      expect(spy.getLastValue()).toEqual(testJournal);
    });
  });

  // describe('currentMovementNotesList$', () => {
  //   it('should stream empty list if picking-movement', () => {});
  //   it('should stream notes for picked movement in descending order', () => {});
  // });

  // describe('currentMovementNoteIdx$', () => {
  //   it('should start with 0', () => {});
  //   it('should decrement index when increment index when prevNoteEvent fired', () => {});
  //   it('should decrement index when decrement index when nextNoteEvent fired', () => {});
  //   it('should reset index when weightlifting state changes', () => {});
  //   it('should not increment index if out of bounds', () => {});
  //   it('should not decrement index if out of bounds', () => {});
  // });

  // describe('currentMovementNote$', () => {
  //   it('should be null if picking-movement', () => {});
  //   it('should be null if notes length is 0', () => {});
  //   it('should be note in index === currentIdx if movement is picked', () => {});
  // });

  describe('HTML View', () => {
    it('should display current movement info when working-out state is set', () => {
      const testMovement = { name: 'test name' } as Movement;
      component.movementPickedEvent$.next(testMovement);

      const pickerEl = getElement(fixture, '.movement-picker');
      const workingOutEl = getElement(fixture, '.current-movement-container');
      const movNameEl: HTMLParagraphElement = getElement(
        fixture,
        '.current-movement-showcase .movement-name',
      );

      expect(pickerEl).toBeFalsy();
      expect(workingOutEl).toBeTruthy();
      expect(movNameEl).toBeTruthy();
      expect(movNameEl.textContent?.trim()).toBe(testMovement.name);
    });

    it('should display movement-picker when picking-movement state is set', () => {
      component.pickMovementEvent$.next();

      const pickerEl = getElement(fixture, '.movement-picker');
      const workingOutEl = getElement(fixture, '.current-movement-container');

      expect(pickerEl).toBeTruthy();
      expect(workingOutEl).toBeFalsy();
    });

    it('should emit pickMovementEvent when Next Movement button is clicked', () => {
      component.movementPickedEvent$.next({} as Movement);

      const spy = subscribeSpyTo(component.pickMovementEvent$);

      const nextMovementBtn: ButtonComponent = getComponent(
        fixture,
        '#nextMovementBtn',
      ).componentInstance;

      nextMovementBtn.onClicked.next();

      expect(spy.getValuesLength()).toBe(1);
    });

    it('should emit movementPickedEvent$ when any movement is clicked', () => {
      const testMovements = [
        { id: 1, name: 'first mov' },
        { id: 2, name: 'second fake' },
        { id: 45, name: 'last' },
      ] as Movement[];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'picking-movement' },
        movements: testMovements,
        movementsInSets: [],
      });

      const spy = subscribeSpyTo(component.movementPickedEvent$);

      const movementElements: HTMLDivElement[] = getElements(fixture, '.movement-item');

      for (let [index, movEl] of movementElements.entries()) {
        movEl.click();
        expect(spy.getLastValue()).toEqual(testMovements[index]);
        const nameEl: HTMLSpanElement = movementElements[index].querySelector('.movement-name')!;
        expect(nameEl.textContent?.trim()).toBe(testMovements[index].name);
      }
    });

    it('should mark as done those movements that are in sets', () => {
      const testMovements = [{ id: 1 }, { id: 2 }, { id: 12 }, { id: 45 }] as Movement[];
      const doneMovs = [1, 45];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'picking-movement' },
        movements: testMovements,
        movementsInSets: doneMovs,
      });

      const movementElements: HTMLDivElement[] = getElements(fixture, '.movement-item');

      expect(Array.from(movementElements[0].classList)).toContain('done');
      expect(Array.from(movementElements[1].classList)).not.toContain('done');
      expect(Array.from(movementElements[2].classList)).not.toContain('done');
      expect(Array.from(movementElements[3].classList)).toContain('done');
    });

    it('should emit addSetEvent$ when Add Series button is clicked', () => {
      const testMovement = getMovementsFixture()[0];
      component.movementPickedEvent$.emit(testMovement);

      const spy = subscribeSpyTo(component.addSetEvent$);
      const addSeriesBtn: ButtonComponent = getComponent(
        fixture,
        '#addSeriesBtn',
      ).componentInstance;

      addSeriesBtn.onClicked.next();

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual(testMovement);
    });

    it('should properly render the sets from the view model observable', () => {
      const testMovement = getMovementsFixture()[0];
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const setsEls: HTMLDivElement[] = getElements(fixture, '.sets-container .set');

      expect(setsEls).toHaveSize(testSets.length);

      for (let [idx, el] of setsEls.entries()) {
        const set = testSets[idx];

        const repsEl: HTMLSpanElement = el.querySelector('.reps-count')!;
        const weightEl: HTMLInputElement = el.querySelector('.weight input')!;

        expect(repsEl.textContent?.trim()).toBe(set.reps.toString());
        expect(weightEl.value).toBe(set.weight.toString());
      }
    });

    it('should emit repsToEvent$ on proper set with -1 on remove rep click', () => {
      const testMovement = getMovementsFixture()[0];
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const spy = subscribeSpyTo(component.repsToEvent$);

      const removeEls: HTMLSpanElement[] = getElements(fixture, '.rep-button.remove');

      const testIdx = 1;
      const testSet = testSets[testIdx];
      const removeBtn = removeEls[testIdx];

      removeBtn.click();

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual({ set: testSet, delta: -1 });
    });

    it('should emit repsToEvent$ on proper set with 1 on add rep click', () => {
      const testMovement = getMovementsFixture()[0];
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const spy = subscribeSpyTo(component.repsToEvent$);

      const removeEls: HTMLSpanElement[] = getElements(fixture, '.rep-button.add');

      const testIdx = 1;
      const testSet = testSets[testIdx];
      const removeBtn = removeEls[testIdx];

      removeBtn.click();

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual({ set: testSet, delta: 1 });
    });

    it('should emit repsToEvent$ on proper set with -5 on remove rep double click', () => {
      const testMovement = getMovementsFixture()[0];
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const spy = subscribeSpyTo(component.repsToEvent$);

      const removeEls = getComponents(fixture, '.rep-button.remove');

      const testIdx = 1;
      const testSet = testSets[testIdx];
      const removeBtn = removeEls[testIdx];

      removeBtn.triggerEventHandler('dblclick');

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual({ set: testSet, delta: -5 });
    });

    it('should emit repsToEvent$ on proper set with 5 on add rep double click', () => {
      const testMovement = getMovementsFixture()[0];
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const spy = subscribeSpyTo(component.repsToEvent$);

      const removeEls = getComponents(fixture, '.rep-button.add');

      const testIdx = 1;
      const testSet = testSets[testIdx];
      const removeBtn = removeEls[testIdx];

      removeBtn.triggerEventHandler('dblclick');

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual({ set: testSet, delta: 5 });
    });

    it('should properly emit setWeightToSetEvent$ when a set weight is changed', () => {
      const testMovement = getMovementsFixture()[0];
      const testWeight = 123;
      const testSets: LiftingSetCreationParams[] = [
        { movement_id: testMovement.id, reps: 8, weight: 22.5 },
        { movement_id: testMovement.id, reps: 7, weight: 22.5 },
        { movement_id: testMovement.id, reps: 10, weight: 22 },
      ];

      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: testMovement },
        sets: testSets,
      });

      const spy = subscribeSpyTo(component.setWeightToSetEvent$);

      const idx = 2;
      const testSet = testSets[idx];
      const testInput = getComponents(fixture, '.sets-container input')[idx];

      const mockChangeEvent = { target: { value: testWeight } } as unknown as Event;
      testInput.triggerEventHandler('change', mockChangeEvent);

      expect(spy.getValuesLength()).toBe(1);
      expect(spy.getLastValue()).toEqual({ set: testSet, weight: mockChangeEvent });
    });

    it('should render session notes if picking-movement', () => {
      component.pickMovementEvent$.emit();

      const prevSessNotesEl = getElement(fixture, '#previous-session-notes');
      const lastSessEl = getElement(fixture, '#last-session-toggle');
      const bestSessEl = getElement(fixture, '#best-session-toggle');

      expect(prevSessNotesEl).toBeTruthy();
      expect(lastSessEl).toBeFalsy();
      expect(bestSessEl).toBeFalsy();
    });

    it('should properly pass last session to render if theres one', () => {
      const testMovement = getMovementsFixture()[0];
      const testJournal = getEntriesFixture();
      const testSession = getEntriesFixture()[0];
      spyOn(movementsService, 'getMovementJournal').and.returnValue(of(testJournal));
      spyOn(journalService, 'getLastSession').and.returnValue(testSession);

      component.movementPickedEvent$.emit(testMovement);

      const lastSessionEntryComponent: MovementJournalEntryComponent = getComponent(
        fixture,
        '#last-session-toggle app-movement-journal-entry',
      ).componentInstance;

      expect(lastSessionEntryComponent.entry).toEqual(testSession);
    });

    it('should properly render best session if theres one', () => {
      const testMovement = getMovementsFixture()[0];
      const testJournal = getEntriesFixture();
      const testSession = getEntriesFixture()[0];
      spyOn(movementsService, 'getMovementJournal').and.returnValue(of(testJournal));
      spyOn(journalService, 'getBestSession').and.returnValue(testSession);

      component.movementPickedEvent$.emit(testMovement);

      const bestSessionEntryComponent: MovementJournalEntryComponent = getComponent(
        fixture,
        '#best-session-toggle app-movement-journal-entry',
      ).componentInstance;

      expect(bestSessionEntryComponent.entry).toEqual(testSession);
    });

    it('should not render movement sessions if not trained yet', () => {
      const testMovement = getMovementsFixture()[0];
      spyOn(movementsService, 'getMovementJournal').and.returnValue(of([]));

      component.movementPickedEvent$.emit(testMovement);

      const lastSessionEntryEl = getElement(
        fixture,
        '#last-session-toggle app-movement-journal-entry',
      );
      const bestSessionEntryEl = getElement(
        fixture,
        '#last-session-toggle app-movement-journal-entry',
      );
      const lastSessionMessage = getElement(fixture, '#best-session-toggle p.message');
      const bestSessionMessage = getElement(fixture, '#best-session-toggle p.message');

      expect(lastSessionEntryEl).toBeFalsy();
      expect(bestSessionEntryEl).toBeFalsy();
      expect(lastSessionMessage).toBeTruthy();
      expect(bestSessionMessage).toBeTruthy();
    });

    it('should properly display current movement note', () => {
      const notesMock = getMovementNotesFixture();
      const noteMock = { ...notesMock[0], date: new Date('2023-01-03T13:55') };
      const movementMock = getMovementsFixture()[0];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'working-out', currentMovement: movementMock as Movement },
        notes: {
          currentNote: noteMock,
          list: notesMock,
          noteIdx: 0,
        },
      });

      const notesShowcase = getElement(fixture, '.notes-showcase');
      const notesContent: HTMLParagraphElement = getElement(
        fixture,
        '.notes-showcase .note-content',
      );
      const dateEl: HTMLParagraphElement = getElement(fixture, '.notes-showcase .note-date');

      expect(notesShowcase).toBeTruthy();
      expect(notesContent.textContent?.trim()).toBe(noteMock.notes);
      expect(dateEl.textContent?.trim()).toBe('Jan 03, 2023 @ 01:55PM');
    });

    it('should not display movement notes if picking-movemnt', () => {
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: { state: 'picking-movement' },
      });

      const notesShowcase = getElement(fixture, '.notes-showcase');

      expect(notesShowcase).toBeFalsy();
    });

    it('should add disabled class to prev note button if max index reached', () => {
      const notesMock = getMovementNotesFixture();
      const noteMock = notesMock[0];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: {
          state: 'working-out',
          currentMovement: {} as Movement,
        },
        notes: {
          currentNote: noteMock,
          list: notesMock,
          noteIdx: notesMock.length - 1,
        },
      });

      const prevButton: HTMLSpanElement = getElement(fixture, '.notes-showcase .arrow.prev');

      expect(Array.from(prevButton.classList)).toContain('disabled');
    });

    it('should not add disabled class to prev note button if max index not reached', () => {
      const notesMock = getMovementNotesFixture();
      const noteMock = notesMock[0];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: {
          state: 'working-out',
          currentMovement: {} as Movement,
        },
        notes: {
          currentNote: noteMock,
          list: notesMock,
          noteIdx: notesMock.length - 2,
        },
      });

      const prevButton: HTMLSpanElement = getElement(fixture, '.notes-showcase .arrow.prev');

      expect(Array.from(prevButton.classList)).not.toContain('disabled');
    });

    it('should add disabled class to next note button if 0 index reached', () => {
      const notesMock = getMovementNotesFixture();
      const noteMock = notesMock[0];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: {
          state: 'working-out',
          currentMovement: {} as Movement,
        },
        notes: {
          currentNote: noteMock,
          list: notesMock,
          noteIdx: 0,
        },
      });

      const nextButton: HTMLSpanElement = getElement(fixture, '.notes-showcase .arrow.next');

      expect(Array.from(nextButton.classList)).toContain('disabled');
    });

    it('should not add disabled class to next note button if 0 index not reached', () => {
      const notesMock = getMovementNotesFixture();
      const noteMock = notesMock[0];
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: {
          state: 'working-out',
          currentMovement: {} as Movement,
        },
        notes: {
          currentNote: noteMock,
          list: notesMock,
          noteIdx: 1,
        },
      });

      const nextButton: HTMLSpanElement = getElement(fixture, '.notes-showcase .arrow.next');

      expect(Array.from(nextButton.classList)).not.toContain('disabled');
    });

    it('should not render movement notes toggle if current movement has no notes', () => {
      // @ts-ignore: ViewModel type is not accesible, so we cant 'as' mock here.
      component.vm$ = of({
        weightliftingState: {
          state: 'working-out',
          currentMovement: {} as Movement,
        },
        notes: {
          currentNote: null,
          list: [],
          noteIdx: 0,
        },
      });

      const notesShowcase = getElement(fixture, '.notes-showcase');

      expect(notesShowcase).toBeFalsy();
    });
  });
});
