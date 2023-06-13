import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuscularGroupSelectorComponent } from 'src/app/components/muscular-group-selector/muscular-group-selector.component';
import { ItemComponent } from 'src/app/components/muscular-group-selector/item/item.component';

const components = [MuscularGroupSelectorComponent, ItemComponent];

/**
 * Common MuscleGroups-related components that might be used in other modules.
 */
@NgModule({
  declarations: components,
  imports: [CommonModule],
  exports: components,
})
export class MusclegroupsCommonModule {}
