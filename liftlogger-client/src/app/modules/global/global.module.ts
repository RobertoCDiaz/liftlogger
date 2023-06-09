import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { FormsModule } from '@angular/forms';
import { ContentLoaderComponent } from 'src/app/components/content-loader/content-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DrawerPageComponent } from 'src/app/components/drawer-page/drawer-page.component';
import { MainSidenavComponent } from 'src/app/components/main-sidenav/main-sidenav.component';
import { AppBarComponent } from 'src/app/components/app-bar/app-bar.component';

const components = [
  ButtonComponent,
  SearchBarComponent,
  ContentLoaderComponent,
  DrawerPageComponent,
  MainSidenavComponent,
  AppBarComponent,
];

/**
 * A module that contains basic app-wide components.
 */
@NgModule({
  declarations: components,
  imports: [CommonModule, FormsModule, NgxSkeletonLoaderModule, MatDividerModule, MatSidenavModule],
  exports: components,
})
export class GlobalModule {}
