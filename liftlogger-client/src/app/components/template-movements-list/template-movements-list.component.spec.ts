import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MovementsPickerDialog,
  TemplateMovementsListComponent,
} from './template-movements-list.component';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Movement } from 'src/app/models/MovementModel';
import { AppModule } from 'src/app/app.module';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';

describe('TemplateMovementsListComponent', () => {
  let component: TemplateMovementsListComponent;
  let fixture: ComponentFixture<TemplateMovementsListComponent>;

  let state: CreateTemplateComponentState;
  let dialog: MatDialog;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [CreateTemplateComponentState],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateMovementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    state = fixture.debugElement.injector.get(CreateTemplateComponentState);
    dialog = TestBed.inject(MatDialog);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('handleItemDropped()', () => {
    it('should call state method to move a movement', () => {
      const spy = spyOn(state, 'moveMovement');
      const fromIdx = 1;
      const toIdx = 0;

      component.handleItemDropped({
        previousIndex: fromIdx,
        currentIndex: toIdx,
      } as CdkDragDrop<Movement>);

      expect(spy).toHaveBeenCalledWith(fromIdx, toIdx);
    });
  });

  describe('openMovementPicker()', () => {
    it('should open dialog', () => {
      const spy = spyOn(dialog, 'open');

      component.openMovementPicker();

      expect(spy).toHaveBeenCalled();
    });
  });
});

describe('MovementsPickerDialog', () => {
  let component: MovementsPickerDialog;
  let fixture: ComponentFixture<MovementsPickerDialog>;

  let dialogRef: MatDialogRef<MovementsPickerDialog>;
  let state: CreateTemplateComponentState;

  beforeEach(async () => {
    state = new CreateTemplateComponentState();

    await TestBed.configureTestingModule({
      providers: [
        CreateTemplateComponentState,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            stateRef: state,
          },
        },
        {
          provide: MatDialogRef,
          useValue: jasmine.createSpyObj('MatDialogRef', ['close']),
        },
      ],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementsPickerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dialogRef = fixture.debugElement.injector.get(MatDialogRef<MovementsPickerDialog>);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('selectMovement()', () => {
    it('should add movement to state list', () => {
      const testMovement = getMovementsFixture()[0];
      const spy = spyOn(state, 'addMovements');

      component.selectMovement(testMovement);

      expect(spy).toHaveBeenCalledWith(testMovement);
    });
  });

  describe('closeDialog()', () => {
    it('should try to close dialog', () => {
      component.closeDialog();

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
});
