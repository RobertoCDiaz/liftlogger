import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import {
  Template,
  TemplateCreationParams,
  TemplateCreationRequestParams,
} from '../models/TemplateModel';

/**
 * Provides general utility methods to deal with Templates.

 */
@Injectable({
  providedIn: 'root',
})
export class TemplatesService {
  http: HttpService = inject(HttpService);

  /**
   * Makes a request to the server asking for the templates owned by the current user.
   *
   * @returns The list of the user's templates
   */
  getUserTemplates(): Observable<Template[]> {
    return this.http.get<Template[]>('templates');
  }

  /**
   * Makes a request to the server to create a new Template.
   *
   * @param template Data for the new Template
   * @param movementsIds Identifiers of the movements to be included in the template
   * @returns The new Template record
   */
  createTemplate(template: TemplateCreationParams, movementsIds?: number[]): Observable<Template> {
    return this.http.post<TemplateCreationRequestParams, Template>('templates', {
      template,
      movements_ids: movementsIds,
    });
  }

  /**
   * Extracts the names of all the muscle groups that a Template works out.
   *
   * @param template Template object
   * @returns List of the groups' names
   */
  getMuscleGroupsFromTemplate(template: Template): Set<string> {
    const result: Set<string> = new Set();

    template.movements?.forEach(movement => {
      movement.groups?.forEach(g => {
        result.add(g.name);
      });
    });

    return result;
  }
}
