import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTemplateComponent, CreateTemplateComponentState } from './create-template.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { Movement } from 'src/app/models/MovementModel';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';
import { CreatorForm } from 'src/app/components/creator-page/creator-page.component';
import { AppModule } from 'src/app/app.module';

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateTemplateComponentState],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should store true if there are movements selected in state', () => {
      const testMovements = getMovementsFixture();
      spyOn(state, 'getMovements').and.returnValue(of(testMovements));

      component.ngOnInit();

      component.areMovementsSelected$.subscribe(result => {
        expect(result).toBeTrue();
      });
    });

    it('should store false if there are no movements selected in state', () => {
      spyOn(state, 'getMovements').and.returnValue(of([]));

      component.ngOnInit();

      component.areMovementsSelected$.subscribe(result => {
        expect(result).toBeFalse();
      });
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
