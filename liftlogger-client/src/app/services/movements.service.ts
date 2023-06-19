import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MuscleGroup } from '../models/MuscleGroupModel';
import {
  Movement,
  MovementCreationParams,
  MovementCreationRequestParams,
} from '../models/MovementModel';
import { MovementJournalEntry } from '../models/MovementJournalEntry';
import { HttpService } from './http.service';

/**
 * Collection of methods and operations to help in the Movements handling.
 */
@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(private http: HttpService) {}

  /**
   * Fetches a single Movement from the server.
   *
   * @param id Identifier of the Movement
   * @returns Movement entry from DB
   */
  getMovement(id: number): Observable<Movement> {
    return this.http.get('movements/' + id);
  }

  /**
   * Gets a list of all the individual sessions in which a Movement was trained. It does NOT return LiftingSessions, but a miniset of them instead, with specific information regarding a single Movement.
   *
   * @param id Movement whose entries are to be fetched
   * @param recentsFirst Whether the list should already come ordered from more recent to older
   * @returns JournalEntries for the Movement
   */
  getMovementJournal(
    id: number,
    recentsFirst: boolean = false,
  ): Observable<MovementJournalEntry[]> {
    return this.http.get(`movements/${id}/journal${recentsFirst ? '?recentsFirst=true' : ''}`);
  }

  /**
   * Given a Movement, it gets a list of just the names of it's MuscleGroups.
   *
   * @param movement Movement object
   * @returns List of names
   */
  getGroupNames(movement: Movement): string[] {
    if (!movement.groups) {
      return [];
    }

    return movement.groups.map(g => g.name);
  }

  /**
   * Makes a petition to the server to create a new Movement.
   *
   * @param movement Movement to create
   * @param groups List of Muscle Groups this new Movement will belong to
   * @returns Created movement
   */
  createMovement(movement: MovementCreationParams, groups: MuscleGroup[]): Observable<Movement> {
    return this.http.post<MovementCreationRequestParams, Movement>('movements', {
      movement,
      muscleGroups: groups.map(group => ({
        group_id: group.id,
        is_primary: group.isPrimary ?? false,
      })),
    });
  }
}
