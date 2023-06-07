import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';

const components = [ButtonComponent, SearchBarComponent];

/**
 * A module that contains basic app-wide components.
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule],
  exports: components,
})
export class GlobalModule {}
