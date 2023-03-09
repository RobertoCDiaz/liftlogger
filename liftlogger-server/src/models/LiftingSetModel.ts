import { LiftingSet } from "@prisma/client";

export type LiftingSetCreationParams = Omit<LiftingSet, 'id' | 'notes'> & {
  notes?: string;
};
