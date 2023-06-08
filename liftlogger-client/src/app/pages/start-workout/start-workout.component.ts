import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { Observable, combineLatest, map, startWith } from 'rxjs';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { Template } from 'src/app/models/TemplateModel';
import { TemplatesService } from 'src/app/services/templates.service';

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
