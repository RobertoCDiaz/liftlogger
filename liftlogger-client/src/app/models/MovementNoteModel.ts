/**
 * Notes made for a movement on a specific date. It could be notes on how to improve the movement
 * form, reminders for next sessions such as increase weight, etc.
 */
export type MovementNote = {
  /**
   * Identifier for the Note.
   */
  id: number;

  /**
   * Actual notes.
   */
  notes: string;

  /**
   * Date for the Note.
   */
  date: Date;

  /**
   * Identifier for the Movement this Note belongs to.
   */
  movement_id: number;
};

/**
 * Data necessary to create a new MovementNote.
 */
export type MovementNoteCreationParams = Omit<MovementNote, 'id'> & {
  date?: Date;
};
