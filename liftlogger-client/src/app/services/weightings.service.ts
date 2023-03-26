import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Weighting } from '../models/Weighting';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class WeightingsService {

  constructor(private http: HttpService) { }

  createEntry(weighting: Weighting): Observable<Weighting> {
    return this.http.post<Weighting, Weighting>('weightings', weighting);
  }
}
