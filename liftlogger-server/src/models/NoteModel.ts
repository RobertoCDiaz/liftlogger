import { Note } from "@prisma/client";
import { ModelRequestParams } from "../utils/ModelRequestParams";

/**
 * Data required to create a new note. `id` is omitted, and `priority` is turned into an
 * optional property cause it has a default value.
 */
export type NoteCreationParams = Omit<Note, 'id' | 'priority'> & {
  priority?: number;
};

/**
 * When making a request to create a Note, `date` is not required. When not provided,
 * current `new Date()` will be used.
 */
export type NoteCreationRequestParams = ModelRequestParams<Omit<NoteCreationParams, 'date'>> & {
  date?: number;
};
