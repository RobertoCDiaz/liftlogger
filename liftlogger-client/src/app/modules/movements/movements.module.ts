import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalModule } from '../global/global.module';
import { MovementsCommonModule } from '../movements-common/movements-common.module';
import { MovementsLibraryComponent } from 'src/app/pages/movements-library/movements-library.component';
import { MusclegroupsCommonModule } from '../musclegroups-common/musclegroups-common.module';
import { CreateMovementComponent } from 'src/app/pages/create-movement/create-movement.component';
import { RouterModule } from '@angular/router';
import { MovementDetailsComponent } from 'src/app/pages/movement-details/movement-details.component';
import { MovementJournalComponent } from 'src/app/pages/movement-journal/movement-journal.component';

const components = [
  MovementsLibraryComponent,
  CreateMovementComponent,
  MovementDetailsComponent,
  MovementJournalComponent,
];

/**
 * Implementation of the Movements feature. Includes the Movements pages (library, create, etc.).
 */
@NgModule({
  declarations: components,
  imports: [
    CommonModule,
    GlobalModule,
    MovementsCommonModule,
    MusclegroupsCommonModule,
    RouterModule.forChild([
      { path: '', component: MovementsLibraryComponent, title: 'My Movements' },
      { path: 'create', component: CreateMovementComponent, title: 'Create New Movement' },
      { path: ':id', component: MovementDetailsComponent, title: 'Movement Details' },
      { path: ':id/journal', component: MovementJournalComponent, title: 'Movement Journal' },
    ]),
  ],
  exports: components,
})
export class MovementsModule {}
