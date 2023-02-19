import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AddWeightingComponent } from './pages/add-weighting/add-weighting.component';
import { CreateTemplateComponent } from './pages/create-template/create-template.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'add-weighting', component: AddWeightingComponent },
  { path: 'create-template', component: CreateTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
