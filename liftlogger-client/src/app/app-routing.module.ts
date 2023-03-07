import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { CreateMovementComponent } from './pages/create-movement/create-movement.component';
import { CreateMuscleGroupComponent } from './pages/create-muscle-group/create-muscle-group.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';

// TODO: Auth in routes: probably make modules for auth-only routes and other for public ones
const routes: Routes = [
  // { path: '', component: LandingComponent },
  { path: '', component: MainComponent },
  { path: 'add-weighting', component: AddWeightingComponent, canActivate: [AuthGuard] },
  { path: 'create-template', component: CreateTemplateComponent, canActivate: [AuthGuard] },
  { path: 'create-movement', component: CreateMovementComponent, canActivate: [AuthGuard] },
  { path: 'create-muscle-group', component: CreateMuscleGroupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
