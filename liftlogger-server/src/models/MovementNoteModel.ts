import { MovementNote } from "@prisma/client";

/**
 * Data required to create a new Movement Note.
 */
export type MovementNoteCreationParams = Omit<MovementNote, 'id' | 'movement_id'>;

/**
 * Data to request the creation of a new Movement Note.
 * It makes `date` an optional property, so it can be set to `now()` automatically.
 */
export type MovementNoteCreationRequestParams = Omit<MovementNoteCreationParams, 'date'> & {
  date?: number;
}
