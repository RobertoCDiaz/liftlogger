import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from '../models/Group';
import { Movement } from '../models/Movement';
import { MovementJournalEntry } from '../models/MovementJournalEntry';
import { HttpService } from './http.service';

/**
 * Collection of methods and operations to help in the Movements handling.
 */
@Injectable({
  providedIn: 'root'
})
export class MovementsService {
  constructor(private http: HttpService) { }

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
  getMovementJournal(id: number, recentsFirst: boolean = false): Observable<MovementJournalEntry[]> {
    return this.http.get(`movements/${id}/journal?recentsFirst=${recentsFirst}`);
  }

  /**
   * Makes a petition to the server to create a new Movement.
   *
   * @param movement Movement to create
   * @param groups List of Muscle Groups this new Movement will belong to
   * @returns Created movement
   */
  createMovement(movement: Movement, groups: Group[]): Observable<Movement> {
    // TODO: Fix this mess of typing, maybe locate server and client models in one place?
    // TODO: Fix setting primary group on server automatically
    return this.http.post<{
      movement: Movement,
      muscleGroups: {
        group_id: number,
        is_primary: boolean
      }[]
    }, Movement>('movements', {
      movement: {
        name: movement.name,
        description: movement.description
      },
      muscleGroups: groups.map(group => ({
        group_id: group.id!!,
        is_primary: group.isPrimary ?? false,
      })),
    });
  }
}
