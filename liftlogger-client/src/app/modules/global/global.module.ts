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
import { CreatorPageComponent } from 'src/app/components/creator-page/creator-page.component';
import { PageHeaderComponent } from 'src/app/components/page-header/page-header.component';
import { CreatorInputComponent } from 'src/app/components/creator-input/creator-input.component';
import { GraphComponent } from 'src/app/components/graph/graph.component';
import { CalendarComponent } from 'src/app/components/calendar/calendar.component';
import { MatInput, MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';

const components = [
  ButtonComponent,
  SearchBarComponent,
  ContentLoaderComponent,
  DrawerPageComponent,
  MainSidenavComponent,
  AppBarComponent,
  CreatorPageComponent,
  CreatorInputComponent,
  PageHeaderComponent,
  GraphComponent,
  CalendarComponent,
];

/**
 * A module that contains basic app-wide components.
 */
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    MatDividerModule,
    MatSidenavModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [...components, MatInput, MatFormField, MatLabel],
})
export class GlobalModule {}
