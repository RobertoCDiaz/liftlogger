import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  MovementPickerDialogData,
  MovementsPickerDialog,
} from './movements-picker-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';
import { AppModule } from 'src/app/app.module';
import { getMovementsFixture } from 'src/app/fixtures/movements.fixture';

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
          useValue: jasmine.createSpyObj('MatDialogRef', ['close', 'updateSize']),
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
    it('should add movement to state list if multiple selection is set', () => {
      component.data = { singleSelection: false, stateRef: state };
      const testMovement = getMovementsFixture()[0];
      const spy = spyOn(state, 'addMovements');

      component.selectMovement(testMovement);

      expect(spy).toHaveBeenCalledWith(testMovement);
    });

    it('should close the dialog and pass selected movement if single selection is set', () => {
      component.data = { singleSelection: true };
      const testMovement = getMovementsFixture()[0];

      component.selectMovement(testMovement);

      expect(dialogRef.close).toHaveBeenCalledWith(testMovement);
    });
  });

  describe('closeDialog()', () => {
    it('should try to close dialog', () => {
      component.closeDialog();

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('open()', () => {
    it('should open a new MatDialog instance for a MovementsPickerDialog with the passed params', () => {
      const dialogDep = TestBed.inject(MatDialog);
      const openSpy = spyOn(dialogDep, 'open');
      const testParams = { singleSelection: true } satisfies MovementPickerDialogData;

      MovementsPickerDialog.open(dialogDep, testParams);

      expect(openSpy).toHaveBeenCalledWith(MovementsPickerDialog, { data: testParams });
    });
  });
});
