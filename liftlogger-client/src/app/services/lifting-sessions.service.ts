import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LiftingSession,
  LiftingSessionCreationParams,
  LiftingSessionWithSetsCreationRequestParams,
} from '../models/LiftingSessionModel';
import { LiftingSetCreationParams } from '../models/LiftingSetModel';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class LiftingSessionsService {
  private http: HttpService = inject(HttpService);

  /**
   * Attempts to create a new LiftingSession.
   *
   * @param session Data to create the new LiftingSession from
   * @param sets List of LiftingSets that will belong to the session
   * @returns New LiftingSession record
   */
  createSession(
    session: LiftingSessionCreationParams,
    sets: LiftingSetCreationParams[],
  ): Observable<LiftingSession> {
    const reqBody: LiftingSessionWithSetsCreationRequestParams = {
      session: session,
      sets: sets,
    };

    return this.http.post<LiftingSessionWithSetsCreationRequestParams, LiftingSession>(
      'sessions/',
      reqBody,
    );
  }
}
