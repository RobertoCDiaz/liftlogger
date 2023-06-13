import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { LandingComponent } from './pages/landing/landing.component';
import { MainComponent } from './pages/main/main.component';
import { TemplatesLibraryComponent } from './pages/templates-library/templates-library.component';

const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Liftlogger' },
  { path: 'dashboard', component: MainComponent, canActivate: [AuthGuard], title: 'Liftlogger' },
  {
    path: 'add-weighting',
    component: AddWeightingComponent,
    canActivate: [AuthGuard],
    title: 'New Weighting Entry',
  },
  {
    path: 'movements',
    loadChildren: () => import('./modules/movements/movements.module').then(m => m.MovementsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'muscle-groups',
    loadChildren: () =>
      import('./modules/musclegroups/musclegroups.module').then(m => m.MusclegroupsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'templates',
    component: TemplatesLibraryComponent,
    canActivate: [AuthGuard],
    title: 'My Templates',
  },
  {
    path: 'templates/create',
    component: CreateTemplateComponent,
    canActivate: [AuthGuard],
    title: 'Create New Template',
  },
  {
    path: 'templates/update/:id',
    component: CreateTemplateComponent,
    canActivate: [AuthGuard],
    title: 'Update Template',
  },
  {
    path: 'workout',
    loadChildren: () => import('./modules/workout/workout.module').then(m => m.WorkoutModule),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
