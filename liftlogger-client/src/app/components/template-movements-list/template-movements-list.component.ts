import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, inject } from '@angular/core';
import { Movement } from 'src/app/models/MovementModel';
import { CreateTemplateComponentState } from 'src/app/pages/create-template/create-template.component';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';

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
    MovementsPickerDialog.open(this.dialog, { singleSelection: false, stateRef: this.state });
  }
}
