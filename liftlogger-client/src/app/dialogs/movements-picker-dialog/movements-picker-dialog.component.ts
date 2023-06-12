import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Movement } from 'src/app/models/MovementModel';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';

/**
 * Defines the data that will be passed from the current component to a dialog.
 */
export type MovementPickerDialogData =
  | {
      /**
       * Only one movement can be selected. When picked, the dialog will be automatically closed.
       */
      singleSelection: true;
    }
  | {
      /**
       * Multiple movements can be selected.
       */
      singleSelection: false;
      /**
       * Reference to the page's state, so the dialog can make modifications to it too.
       */
      stateRef: CreateTemplateComponentState;
    };

/**
 * Provides the UI for a Dialog that displays a MovementsPicker component.
 */
@Component({
  selector: 'app-movements-picker-dialog',
  template: `
    <h3 mat-dialog-title>Movement Picker</h3>
    <app-movements-picker
      [disableHref]="true"
      [isPicker]="true"
      mat-dialog-content
      (movementSelected)="selectMovement($event)"
    ></app-movements-picker>
    <div mat-dialog-actions align="end">
      <app-button type="no-border" (onClicked)="closeDialog()">Close</app-button>
    </div>
  `,
})
export class MovementsPickerDialog {
  dialogRef: MatDialogRef<MovementsPickerDialog> = inject(MatDialogRef<MovementsPickerDialog>);
  snackBar: MatSnackBar = inject(MatSnackBar);
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovementPickerDialogData) {
    const width = this.breakpointObserver.isMatched('(min-width: 900px)') ? '50vw' : '100vw';

    this.dialogRef.updateSize(width);
  }

  /**
   * Adds selected movement to the page's state.
   * @param movement
   */
  selectMovement(movement: Movement): void {
    if (this.data.singleSelection) {
      this.dialogRef.close(movement);

      return;
    }

    this.snackBar.open('Added [' + movement.name + ']', undefined, {
      duration: 1500,
    });
    this.data.stateRef.addMovements(movement);
  }

  /**
   * Closes the current dialog instance.
   */
  closeDialog(): void {
    this.dialogRef.close();
  }

  /**
   * Creates and display a MovementsPickerDialog instance.
   *
   * @param dialog MatDialog dependency
   * @param data Parameters for the dialog
   * @returns Dialog reference
   */
  static open(dialog: MatDialog, data: MovementPickerDialogData) {
    return dialog.open(MovementsPickerDialog, { data });
  }
}
