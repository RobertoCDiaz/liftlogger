import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateMuscleGroupComponent } from 'src/app/pages/create-muscle-group/create-muscle-group.component';
import { GlobalModule } from '../global/global.module';
import { MusclegroupsCommonModule } from '../musclegroups-common/musclegroups-common.module';
import { RouterModule } from '@angular/router';
import { MusclegroupsLibraryComponent } from 'src/app/pages/musclegroups-library/musclegroups-library.component';
import { MusclegroupsDetailsComponent } from 'src/app/pages/musclegroups-details/musclegroups-details.component';

const components = [
  CreateMuscleGroupComponent,
  MusclegroupsLibraryComponent,
  MusclegroupsDetailsComponent,
];

/**
 * Implementation of the MuscleGroups feature.
 */
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    GlobalModule,
    MusclegroupsCommonModule,
    RouterModule.forChild([
      { path: '', component: MusclegroupsLibraryComponent, title: 'My Muscle Groups' },
      {
        path: 'create',
        component: CreateMuscleGroupComponent,
        title: 'Create New Muscle Group',
      },
      {
        path: ':id',
        component: MusclegroupsDetailsComponent,
        title: 'Muscle Group Details',
      },
    ]),
  ],
  exports: components,
})
export class MusclegroupsModule {}
