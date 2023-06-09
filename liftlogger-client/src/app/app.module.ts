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

import { AppComponent } from './app.component';
import { MainComponent } from './pages/main/main.component';
import { MenuButtonComponent } from './components/menu-button/menu-button.component';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { WeightscaleDataInputComponent } from './components/weightscale-data-input/weightscale-data-input.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { TemplateMovementItemComponent } from './components/template-movement-item/template-movement-item.component';
import { TemplateMovementsListComponent } from './components/template-movements-list/template-movements-list.component';
import { CreateMovementComponent } from './pages/create-movement/create-movement.component';
import { CreatorInputComponent } from './components/creator-input/creator-input.component';
import { CreatorPageComponent } from './components/creator-page/creator-page.component';
import { MuscularGroupSelectorComponent } from './components/muscular-group-selector/muscular-group-selector.component';
import { CreateMuscleGroupComponent } from './pages/create-muscle-group/create-muscle-group.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MovementsLibraryComponent } from './pages/movements-library/movements-library.component';
import { MovementJournalEntryComponent } from './components/movement-journal-entry/movement-journal-entry.component';
import { GraphComponent } from './components/graph/graph.component';
import { MovementDetailsComponent } from './pages/movement-details/movement-details.component';
import { MovementJournalComponent } from './pages/movement-journal/movement-journal.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MusclegroupsLibraryComponent } from './pages/musclegroups-library/musclegroups-library.component';
import { MusclegroupsDetailsComponent } from './pages/musclegroups-details/musclegroups-details.component';
import { TemplatesLibraryComponent } from './pages/templates-library/templates-library.component';

import { environment } from 'src/environment/environment';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MenuButtonComponent,
    AddWeightingComponent,
    PageHeaderComponent,
    WeightscaleDataInputComponent,
    CreateTemplateComponent,
    TemplateMovementItemComponent,
    TemplateMovementsListComponent,
    CreateMovementComponent,
    CreatorInputComponent,
    CreatorPageComponent,
    MuscularGroupSelectorComponent,
    CreateMuscleGroupComponent,
    LandingComponent,
    MovementsLibraryComponent,
    MovementJournalEntryComponent,
    GraphComponent,
    MovementDetailsComponent,
    MovementJournalComponent,
    CalendarComponent,
    MusclegroupsLibraryComponent,
    MusclegroupsDetailsComponent,
    TemplatesLibraryComponent,
  ],
  imports: [
    GlobalModule,
    MovementsModule, // TODO: Delete circular module dependency
    BrowserModule,
    AppRoutingModule,
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
    AuthModule.forRoot({
      domain: environment.auth0Domain,
      clientId: environment.auth0ClientId,
      authorizationParams: {
        redirect_uri: environment.auth0CallbackUrl,
        audience: environment.auth0Audience,
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
