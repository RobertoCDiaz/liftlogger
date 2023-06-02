import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, Inject, inject } from '@angular/core';
import { Movement } from 'src/app/models/MovementModel';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Defines the data that will be passed from the current component to a dialog.
 */
type MovementPickerDialogData = {
  /**
   * Reference to the page's state, so the dialog can make modifications to it too.
   */
  stateRef: CreateTemplateComponentState;
};

@Component({
  selector: 'app-template-movements-list',
  templateUrl: './template-movements-list.component.html',
  styleUrls: ['./template-movements-list.component.sass'],
})
export class TemplateMovementsListComponent {
  /**
   * Page component's state.
   */
  state: CreateTemplateComponentState = inject(CreateTemplateComponentState);

  /**
   * Utility for checking the matching state of media queries.
   */
  breakpointObserver: BreakpointObserver = inject(BreakpointObserver);

  /**
   * Provides utility to use the MatDialog component.
   */
  dialog: MatDialog = inject(MatDialog);

  /**
   * From a DragDrop event, calls state method that moves a movement from its
   * original position to the new one.
   *
   * @param event DragDrop event reference
   */
  handleItemDropped(event: CdkDragDrop<Movement>) {
    this.state.moveMovement(event.previousIndex, event.currentIndex);
  }

  /**
   * Displays a new instance of a MovementPickerDialog.
   */
  openMovementPicker() {
    this.dialog.open(MovementsPickerDialog, {
      width: this.breakpointObserver.isMatched('(min-width: 900px)') ? '50vw' : '100vw',
      maxHeight: this.breakpointObserver.isMatched('(min-width: 900px)') ? '80vw' : '500vh',
      data: {
        stateRef: this.state,
      } satisfies MovementPickerDialogData,
    });
  }
}

/**
 * Provides the UI for a Dialog that displays a MovementsPicker component.
 */
@Component({
  selector: 'app-dialog',
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

  constructor(@Inject(MAT_DIALOG_DATA) public data: MovementPickerDialogData) {}

  /**
   * Adds selected movement to the page's state.
   * @param movement
   */
  selectMovement(movement: Movement): void {
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
}
