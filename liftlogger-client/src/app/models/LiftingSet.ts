import { LiftingSession } from './LiftingSession';
import { Movement } from './MovementModel';

/**
 * Individual set perfomed during a weighlifting session.
 */
export type LiftingSet = {
  /**
   * Idenfitier for this set in DB.
   */
  id?: number;

  /**
   * Identifier for the movement made in this set.
   */
  movement_id?: number;

  /**
   * Number of repetitions of the movement.
   */
  reps: number;

  /**
   * How much weight used in this movement.
   */
  weight: number;

  /**
   * Identifier for the LiftingSession of which this set belongs to.
   */
  session_id?: number;

  /**
   * LiftingSession this set belongs to.
   */
  session?: LiftingSession;

  /**
   * Movement made during this set.
   */
  movement?: Movement;
};
