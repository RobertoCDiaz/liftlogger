import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';
import { MovementsPickerComponent } from 'src/app/components/movements-picker/movements-picker.component';
import { GlobalModule } from '../global/global.module';
import { MovementsPickerGroupItemComponent } from 'src/app/components/movements-picker-group-item/movements-picker-group-item.component';
import { MovementsPickerMovementItemComponent } from 'src/app/components/movements-picker-movement-item/movements-picker-movement-item.component';
import { ItemComponent } from 'src/app/components/muscular-group-selector/item/item.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';

const components = [
  MovementsPickerComponent,
  MovementsPickerDialog,
  MovementsPickerGroupItemComponent,
  MovementsPickerMovementItemComponent,
  ItemComponent,
];

/**
 * Implementation of the Movements feature. Includes the Movements pages (library, create, etc.).
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, GlobalModule, MatDividerModule, MatDialogModule],
  exports: components,
})
export class MovementsModule {}
