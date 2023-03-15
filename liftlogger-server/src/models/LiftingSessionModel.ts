import { LiftingSession } from "@prisma/client";
import { ModelRequestParams } from "../utils/ModelRequestParams";
import { LiftingSetCreationParams } from "./LiftingSetModel";

/**
 * Data required to create a new Liftin Session.
 */
export type LiftingSessionCreationParams = Omit<LiftingSession, 'id' | 'notes'> & {
  notes?: string;
};

/**
 * When making a request to create a new session, it should also ask for
 * a list of sets to associate with the session. So, this type defines the shape
 * for that POST request.
 */
export type LiftingSessionWithSetsCreationRequestParams = {
  /**
   * Data for the session to be created, omitting the `user_email`.
   */
  session: ModelRequestParams<LiftingSessionCreationParams>;

  /**
   * Data to create the sets that will be associated with the new session.
   */
  sets: LiftingSetCreationParams[];
}
