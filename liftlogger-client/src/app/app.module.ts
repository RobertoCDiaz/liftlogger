import { NgModule } from '@angular/core';
import { GlobalModule } from './modules/global/global.module';
import { MovementsModule } from './modules/movements/movements.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { WorkoutModule } from './modules/workout/workout.module';
import { MusclegroupsModule } from './modules/musclegroups/musclegroups.module';
import { MusclegroupsCommonModule } from './modules/musclegroups-common/musclegroups-common.module';
import { MovementsCommonModule } from './modules/movements-common/movements-common.module';

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { WeightscaleDataInputComponent } from './components/weightscale-data-input/weightscale-data-input.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { TemplateMovementItemComponent } from './components/template-movement-item/template-movement-item.component';
import { TemplateMovementsListComponent } from './components/template-movements-list/template-movements-list.component';
import { LandingComponent } from './pages/landing/landing.component';
import { TemplatesLibraryComponent } from './pages/templates-library/templates-library.component';

import { HttpService } from './services/http.service';

import { environment } from 'src/environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuButtonComponent,
    AddWeightingComponent,
    WeightscaleDataInputComponent,
    CreateTemplateComponent,
    TemplateMovementItemComponent,
    TemplateMovementsListComponent,
    LandingComponent,
    TemplatesLibraryComponent,
  ],
  imports: [
    AppRoutingModule,
    GlobalModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    DragDropModule,
    MatRippleModule,
    MatSnackBarModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: environment.auth0CallbackUrl,
        audience: environment.auth0Audience,
      },
    }),
    // temporal modules // TODO: Remove and fix tests
    WorkoutModule,
    MovementsModule,
    MusclegroupsModule,
    MusclegroupsCommonModule,
    MovementsCommonModule,
  ],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule {}
