import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weighting } from '../models/Weighting';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WeightingsService {

  constructor(private http: HttpService) { }

  getEntries(): Observable<Weighting[]> {
    return this.http.get<Weighting[]>('weightings');
  }

  createEntry(weighting: Weighting): Observable<Weighting> {
    weighting.user_email = "robertocdiazsanchez@gmail.com"; // TODO: use real user email once auth is implemented

    return this.http.post<Weighting, Weighting>('weightings', weighting);
  }
}
