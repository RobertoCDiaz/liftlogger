import { Injectable, inject } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import {
  Template,
  TemplateCreationParams,
  TemplateCreationRequestParams,
  TemplateUpdateParams,
  TemplateUpdateRequestParams,
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
   * Fetches from the server a specific Template from the user.
   *
   * @param id Identifier for the Template
   * @returns Template record
   */
  getTemplate(id: number): Observable<Template> {
    return this.http.get<Template>('templates/' + id);
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
   * Makes a request to the server to update a Template.
   *
   * @param id Identifier of te Template to be updated
   * @param template Data to update the Template with
   * @param movementsIds Identifiers of the movements to be included in the template
   * @returns Updated Template record
   */
  updateTemplate(
    id: number,
    template: TemplateUpdateParams,
    movementsIds?: number[],
  ): Observable<Template> {
    return this.http.put<TemplateUpdateRequestParams, Template>('templates/' + id, {
      template,
      movements_ids: movementsIds,
    });
  }

  /**
   * Makes a request to the server to delete a Template.
   *
   * @param id Identifier of te Template to be deleted
   * @returns Delete operation observable
   */
  deleteTemplate(id: number): Observable<void> {
    return this.http.delete<void>('templates/' + id);
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
      movement.movement?.groups?.forEach(g => {
        result.add(g.name);
      });
    });

    return result;
  }
}
