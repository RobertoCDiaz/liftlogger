import { Injectable } from '@angular/core';
import { MovementJournalEntry } from '../models/MovementJournalEntry';

@Injectable({
  providedIn: 'root'
})
export class MovementJournalsService {
  constructor() { }

  /**
   * Returns the journal entry with the hightest score value from a list of entries.
   *
   * @param journal Journal entries
   * @returns The journal's best session entry
   */
  getBestSession(journal: MovementJournalEntry[]): MovementJournalEntry {
    return [...journal].sort((a, b) => b.value - a.value)[0];
  }

  /**
   * From a list of journal entries, returns the entry with the most recent date.
   *
   * @param journal Journal entries
   * @returns Most recent entry
   */
  getLastSession(journal: MovementJournalEntry[]): MovementJournalEntry {
    return [...journal].sort((a, b) => b.date - a.date)[0];
  }

  /**
   * From a list of journal entries for a Movement, gets the session in which
   * the most weight has been ever lifted for the most repetitions.
   *
   * @param journal List of journal entries
   * @returns PR Session
   */
  getPRSession(journal: MovementJournalEntry[]): MovementJournalEntry {
    let prSession: MovementJournalEntry = journal[0];
    let prValue: number = 0;
    for (let entry of journal) {
      const setValues: number[] = entry.session.sets.map(s => s.weight * s.reps);

      const bestSetValue: number = setValues.sort((a, b) => b - a)[0];

      if (bestSetValue > prValue) {
        prSession = entry;
        prValue = bestSetValue;
      }
    }

    return prSession;
  }
}
