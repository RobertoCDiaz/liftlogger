import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from 'src/app/pages/main/main.component';
import { RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav'
import { MainSidenavComponent } from 'src/app/components/main-sidenav/main-sidenav.component';
import { MatDividerModule } from '@angular/material/divider';
import { MenuButtonComponent } from 'src/app/components/menu-button/menu-button.component';

@NgModule({
  declarations: [
    MainComponent,
    MainSidenavComponent,
    MenuButtonComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatDividerModule,
    RouterModule.forChild([
      { path: '', component: MainComponent }
    ])
  ],
})
export class DashboardModule { }
