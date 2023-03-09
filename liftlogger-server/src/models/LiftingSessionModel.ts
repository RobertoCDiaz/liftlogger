import { LiftingSession } from "@prisma/client";

export type LiftingSessionCreationParams = Omit<LiftingSession, 'id' | 'user_email' | 'notes'> & {
  notes?: string;
};
