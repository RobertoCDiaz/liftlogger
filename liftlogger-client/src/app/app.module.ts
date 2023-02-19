import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { WeightscaleDataInputComponent } from './components/weightscale-data-input/weightscale-data-input.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { TemplateMovementItemComponent } from './components/template-movement-item/template-movement-item.component';
import { TemplateMovementsListComponent } from './components/template-movements-list/template-movements-list.component'
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuButtonComponent,
    AddWeightingComponent,
    PageHeaderComponent,
    WeightscaleDataInputComponent,
    ButtonComponent,
    CreateTemplateComponent,
    TemplateMovementItemComponent,
    TemplateMovementsListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
