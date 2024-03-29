import { LiftingSessionWithSets } from './LiftingSessionModel';

/**
 * Defines an entry for a Movement's Workout Journal.
 */
export type MovementJournalEntry = {
  /**
   * Date in which a Movement's session was made.
   */
  date: Date;

  /**
   * Movement identifier.
   */
  movement_id: number;

  /**
   * Computed value for the intensity of the Movement session.
   */
  value: number;

  /**
   * Source data of this Journal Entry.
   * It's the list of Lifting Sessions in which the Movement was trained in,
   * along with the sets of every Lifting Session for that Movement.
   */
  session: LiftingSessionWithSets;
};

/**
 * Defines the structure of a MovementJournal of a single month.
 */
export type MovementMonthlyJournal = {
  /**
   * Unix time that represents the very first Moment in a month. Used for reference.
   */
  startOfMonth: Date;

  /**
   * List of entries in this month.
   */
  entries: MovementJournalEntry[];
};
