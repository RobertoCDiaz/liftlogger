import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weighting, WeightingCreationParams } from '../models/WeightingModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class WeightingsService {
  constructor(private http: HttpService) {}

  /**
   * Makes a request to create a new Weighting entry for the current user.
   *
   * @param weighting Weighting data
   * @returns New Weighting record
   */
  createEntry(weighting: WeightingCreationParams): Observable<Weighting> {
    return this.http.post<WeightingCreationParams, Weighting>('weightings', weighting);
  }

  /**
   * Requests the server to fetch all the weightings from the current user.
   *
   * @returns All the weightings from the user.
   */
  getUserEntries(): Observable<Weighting[]> {
    return this.http.get<Weighting[]>('weightings');
  }
}
