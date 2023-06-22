import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsPickerComponent } from 'src/app/components/movements-picker/movements-picker.component';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';
import { MovementsPickerGroupItemComponent } from 'src/app/components/movements-picker-group-item/movements-picker-group-item.component';
import { MovementsPickerMovementItemComponent } from 'src/app/components/movements-picker-movement-item/movements-picker-movement-item.component';
import { GlobalModule } from '../global/global.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MovementJournalEntryComponent } from 'src/app/components/movement-journal-entry/movement-journal-entry.component';

const components = [
  MovementsPickerComponent,
  MovementsPickerGroupItemComponent,
  MovementsPickerMovementItemComponent,
  MovementsPickerDialog,
  MovementJournalEntryComponent,
];

/**
 * Common Movements-related components that could be used in other modules.
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, GlobalModule, MatDividerModule, MatDialogModule],
  exports: components,
})
export class MovementsCommonModule {}
