import { Injectable } from '@angular/core';
import { MovementJournalEntry, MovementMonthlyJournal } from '../models/MovementJournalEntry';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class MovementJournalsService {
  constructor() {}

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
    return [...journal].sort((a, b) => (b.date > a.date ? 1 : -1))[0];
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

  /**
   * From a list of MovementJournalEntries, returns a brand new array of the same
   * journal but organized in months.
   *
   * @param wholeJournal List of entries to divide
   * @returns List of MonthlyJournals
   */
  getMonthyJournals(wholeJournal: MovementJournalEntry[]): MovementMonthlyJournal[] {
    const monthsHashMap: Record<string, MovementJournalEntry[]> = {};

    wholeJournal.forEach(entry => {
      const currentMonthStartTime: string = moment(entry.date).startOf('month').toString();

      if (!monthsHashMap[currentMonthStartTime]) {
        monthsHashMap[currentMonthStartTime] = [];
      }

      monthsHashMap[currentMonthStartTime].push(entry);
    });

    const monthlyJournals: MovementMonthlyJournal[] = Object.keys(monthsHashMap).map(
      monthStartTime => ({
        entries: monthsHashMap[monthStartTime],
        startOfMonth: new Date(monthStartTime),
      }),
    );

    monthlyJournals.sort((a, b) => (b.startOfMonth > a.startOfMonth ? 1 : -1));

    return monthlyJournals;
  }

  /**
   * From a MovementMonthlyJournal, returns a string representation of that month.
   *
   * @param journal MonthlyJournal reference
   * @param representation Format in which the month is to be represented. Defaults to `MMMM, Y`
   * @returns Month name representation
   */
  getMonthlyJournalStringName(
    journal: MovementMonthlyJournal,
    representation: string = 'MMMM, Y',
  ): string {
    return moment(journal.startOfMonth).format(representation);
  }
}
