import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ContentLoaderComponent } from 'src/app/components/content-loader/content-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

const components = [ButtonComponent, SearchBarComponent, ContentLoaderComponent];

/**
 * A module that contains basic app-wide components.
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule, NgxSkeletonLoaderModule],
  exports: components,
})
export class GlobalModule {}
