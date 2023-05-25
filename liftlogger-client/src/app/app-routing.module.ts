import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { CreateMovementComponent } from './pages/create-movement/create-movement.component';
import { CreateMuscleGroupComponent } from './pages/create-muscle-group/create-muscle-group.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';
import { MovementDetailsComponent } from './pages/movement-details/movement-details.component';
import { MovementJournalComponent } from './pages/movement-journal/movement-journal.component';
import { MovementsLibraryComponent } from './pages/movements-library/movements-library.component';
import { MusclegroupsLibraryComponent } from './pages/musclegroups-library/musclegroups-library.component';
import { MusclegroupsDetailsComponent } from './pages/musclegroups-details/musclegroups-details.component';
import { TemplatesLibraryComponent } from './pages/templates-library/templates-library.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'add-weighting', component: AddWeightingComponent, canActivate: [AuthGuard] },
  { path: 'movements', component: MovementsLibraryComponent, canActivate: [AuthGuard] },
  { path: 'movements/create', component: CreateMovementComponent, canActivate: [AuthGuard] },
  { path: 'movements/:id', component: MovementDetailsComponent, canActivate: [AuthGuard] },
  { path: 'movements/:id/journal', component: MovementJournalComponent, canActivate: [AuthGuard] },
  { path: 'muscle-groups', component: MusclegroupsLibraryComponent, canActivate: [AuthGuard] },
  { path: 'muscle-groups/create', component: CreateMuscleGroupComponent, canActivate: [AuthGuard] },
  { path: 'muscle-groups/:id', component: MusclegroupsDetailsComponent, canActivate: [AuthGuard] },
  { path: 'templates', component: TemplatesLibraryComponent, canActivate: [AuthGuard] },
  { path: 'templates/create', component: CreateTemplateComponent, canActivate: [AuthGuard] },
  { path: 'templates/update/:id', component: CreateTemplateComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
