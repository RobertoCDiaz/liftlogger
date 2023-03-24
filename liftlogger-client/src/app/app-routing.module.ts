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
import { MovementsLibraryComponent } from './pages/movements-library/movements-library.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard] },
  { path: 'movements', component: MovementsLibraryComponent, canActivate: [AuthGuard] },
  { path: 'movements/create', component: CreateMovementComponent, canActivate: [AuthGuard] },
  { path: 'movements/:id', component: MovementDetailsComponent, canActivate: [AuthGuard] },
  { path: 'add-weighting', component: AddWeightingComponent, canActivate: [AuthGuard] },
  { path: 'create-template', component: CreateTemplateComponent, canActivate: [AuthGuard] },
  { path: 'create-muscle-group', component: CreateMuscleGroupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
