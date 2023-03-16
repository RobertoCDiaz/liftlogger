import { LiftingSet } from "@prisma/client";

/**
 * Data required to create a LiftingSet. This ommits the ID of the set, as well as the ID of the session
 * it will belong to.
 */
export type LiftingSetCreationParams = Omit<LiftingSet, 'id' | 'notes' | 'session_id'> & {
  notes?: string;
};
