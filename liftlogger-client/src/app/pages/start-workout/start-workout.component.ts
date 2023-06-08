import { AfterViewInit, Component, EventEmitter, ViewChild, inject } from '@angular/core';
import { Observable, combineLatest, map, merge, startWith, switchMap } from 'rxjs';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
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

  /**
   * Event to be fired up when a Template item is clicked.
   * The value to be emitted must be the clicked Template identifier.
   */
  templateClicked: EventEmitter<number> = new EventEmitter<number>();

  /**
   * Holds a "pointer" to know which item is currently selected.
   * It starts with nothing selected by default.
   */
  selectedItem$: Observable<SelectedItem> = merge(
    // if a template is clicked, then set selected item to the clicked template
    this.templateClicked
      .asObservable()
      .pipe<SelectedItem>(map(templateId => ({ type: 'template', template_id: templateId }))),
  ).pipe(startWith({ type: 'none' } satisfies SelectedItem));

  /**
   * SearchBar that will set the query to search Templates.
   */
  @ViewChild('templateSearchBar') templateSearchBar: SearchBarComponent;

  /**
   * Templates to display. They will be filtered using the template search bar query.
   */
  filteredTemplates$: Observable<Template[]>;

  ngAfterViewInit(): void {
    this.filteredTemplates$ = combineLatest([
      this.templatesService.getUserTemplates(),
      this.templateSearchBar.queryChanged.asObservable().pipe(startWith('')),
    ]).pipe(
      map(([templates, query]) => {
        return this.templatesService.searchInTemplates(templates, query);
      }),
    );
  }
}
