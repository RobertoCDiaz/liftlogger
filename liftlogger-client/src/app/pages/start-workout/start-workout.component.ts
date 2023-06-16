import { AfterViewInit, Component, EventEmitter, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, combineLatest, map, merge, startWith, tap, withLatestFrom } from 'rxjs';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { MovementsPickerDialog } from 'src/app/dialogs/movements-picker-dialog/movements-picker-dialog.component';
import { Movement } from 'src/app/models/MovementModel';
import { Template } from 'src/app/models/TemplateModel';
import { TemplatesService } from 'src/app/services/templates.service';

/**
 * Shape of the current selection.
 */
type SelectedItem =
  | {
      /**
       * No item is selected.
       */
      type: 'none';
    }
  | {
      /**
       * A Template is currently selected.
       */
      type: 'template';

      /**
       * Selected Template identifier.
       */
      template_id: number;
    }
  | {
      /**
       * A Movement is currently selected.
       */
      type: 'movement';

      /**
       * Selected Movement.
       */
      movement: Movement;
    };

/**
 * Starting page for a new workout session. It offers the possibility to start a new Weightlifting
 * session from a Template, a Movement, or start a workout using another discipline.
 */
@Component({
  selector: 'app-start-workout',
  templateUrl: './start-workout.component.html',
  styleUrls: ['./start-workout.component.sass'],
})
export class StartWorkoutComponent implements AfterViewInit {
  templatesService: TemplatesService = inject(TemplatesService);
  dialog: MatDialog = inject(MatDialog);
  router: Router = inject(Router);

  /**
   * Event to be fired up when a Template item is clicked.
   * The value to be emitted must be the clicked Template identifier.
   */
  templateClicked: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Event to be fired up when a Movement is picked.
   * The value to be emitted must be the picked Movement identifier.
   */
  movementPicked: EventEmitter<Movement> = new EventEmitter<Movement>();

  /**
   * Holds a "pointer" to know which item is currently selected.
   * It starts with nothing selected by default.
   */
  selectedItem$: Observable<SelectedItem> = merge(
    // if a template is clicked, then set selected item to the clicked template
    this.templateClicked
      .asObservable()
      .pipe<SelectedItem>(map(templateId => ({ type: 'template', template_id: templateId }))),
    // if a movement is picked, then set selected item to the clicked movement
    this.movementPicked
      .asObservable()
      .pipe<SelectedItem>(map(mov => ({ type: 'movement', movement: mov }))),
  ).pipe(startWith({ type: 'none' } satisfies SelectedItem));

  /**
   * SearchBar that will set the query to search Templates.
   */
  @ViewChild('templateSearchBar') templateSearchBar: SearchBarComponent;

  /**
   * Start Button Component instance.
   */
  @ViewChild('startButton') startButton: ButtonComponent;

  /**
   * Templates to display. They will be filtered using the template search bar query.
   */
  filteredTemplates$: Observable<Template[]>;

  /**
   * Fires up when the start button is clicked, and navigates to the appropriate page.
   */
  startWorkoutEvent$: Observable<any>;

  ngAfterViewInit(): void {
    this.filteredTemplates$ = combineLatest([
      this.templatesService.getUserTemplates(),
      this.templateSearchBar.queryChanged.asObservable().pipe(startWith('')),
    ]).pipe(
      map(([templates, query]) => {
        return this.templatesService.searchInTemplates(templates, query);
      }),
    );

    this.startWorkoutEvent$ = this.startButton.onClicked.asObservable().pipe(
      withLatestFrom(this.selectedItem$),
      tap(([_, selectedItem]) => {
        if (selectedItem.type === 'none') {
          alert('Please select an item');
          return;
        }

        if (selectedItem.type === 'template') {
          this.router.navigate(['weightlifting'], { queryParams: selectedItem });
          return;
        }

        if (selectedItem.type === 'movement') {
          this.router.navigate(['weightlifting'], {
            queryParams: {
              type: selectedItem.type,
              movement_id: selectedItem.movement.id,
            },
          });
          return;
        }
      }),
    );
  }

  /**
   * Opens a MovementsPickerDialog instance so that when a movement is picked, it fires up the
   * `movementPicked` event with the selected movement.
   */
  openMovementsPicker() {
    const pickerDialog = MovementsPickerDialog.open(this.dialog, { singleSelection: true });
    pickerDialog.afterClosed().subscribe(movement => {
      if (!movement) {
        return;
      }

      this.movementPicked.emit(movement);
    });
  }
}
