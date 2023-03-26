import { LiftingSet } from "./LiftingSet";

/**
 * A weightlifting session.
 */
export type LiftingSession = {
  /**
   * Identifier for the session.
   */
  id?: number;

  /**
   * When did the session started.
   */
  start_time: number;

  /**
   * When did the session was finished.
   */
  end_time: number;

  /**
   * Notes from the user about this specific session.
   */
  notes?: string;

  /**
   * Owner of this session.
   */
  user_email?: string;

  /**
   * List of sets that belong to this session.
   */
  sets: LiftingSet[];
}
