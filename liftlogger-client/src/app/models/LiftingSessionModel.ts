import { LiftingSet, LiftingSetCreationParams } from './LiftingSetModel';

/**
 * A weightlifting session.
 */
export type LiftingSession = {
  /**
   * Identifier for the session.
   */
  id: number;

  /**
   * When did the session started.
   */
  start_time: Date;

  /**
   * When did the session was finished.
   */
  end_time: Date;

  /**
   * Notes from the user about this specific session.
   */
  notes?: string;

  /**
   * Owner of this session.
   */
  user_email: string;
};

export type LiftingSessionWithSets = LiftingSession & {
  /**
   * List of sets that belong to this session.
   */
  sets: LiftingSet[];
};

/**
 * Data required to create a new LiftingSession.
 */
export type LiftingSessionCreationParams = Omit<LiftingSession, 'id' | 'user_email'>;

/**
 * Shape of the body for the POST request to create a new LiftingSession.
 */
export type LiftingSessionWithSetsCreationRequestParams = {
  /**
   * Session data.
   */
  session: LiftingSessionCreationParams;

  /**
   * List of LiftingSets to include in the session.
   */
  sets: LiftingSetCreationParams[];
};
