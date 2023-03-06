import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { WeightscaleDataInputComponent } from './components/weightscale-data-input/weightscale-data-input.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { TemplateMovementItemComponent } from './components/template-movement-item/template-movement-item.component';
import { TemplateMovementsListComponent } from './components/template-movements-list/template-movements-list.component'
import { CreateMovementComponent } from './pages/create-movement/create-movement.component';
import { CreatorInputComponent } from './components/creator-input/creator-input.component';
import { CreatorPageComponent } from './components/creator-page/creator-page.component';
import { MuscularGroupSelectorComponent } from './components/muscular-group-selector/muscular-group-selector.component';
import { ItemComponent } from './components/muscular-group-selector/item/item.component';
import { CreateMuscleGroupComponent } from './pages/create-muscle-group/create-muscle-group.component'

import { environment } from 'src/environment/environment';

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
    CreateMovementComponent,
    CreatorInputComponent,
    CreatorPageComponent,
    MuscularGroupSelectorComponent,
    ItemComponent,
    CreateMuscleGroupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: environment.auth0Audience
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
