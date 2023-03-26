import { MovementNote, PrismaClient } from '@prisma/client';
import { MovementNoteCreationParams } from '../models/MovementNoteModel';

const prisma = new PrismaClient();

export default class MovementNotesController {
  /**
   * Inserts a new MovementNote into DB.
   *
   * @param note Data to create the new note
   * @param movementId Identifier for the movement in which a note is to be created
   * @returns New MovementNote entry
   */
  static async createNoteForMovement(
    note: MovementNoteCreationParams,
    movementId: number,
  ): Promise<MovementNote | null | undefined> {
    return await prisma.movementNote.create({
      data: {
        ...note,
        movement_id: movementId,
      },
    });
  }

  /**
   * Fetches all the MovementNotes from a Movement.
   *
   * @param movementId Movement identifier whose notes are to be listed
   * @returns List of MovementNotes
   */
  static async getMovementNotes(movementId: number): Promise<MovementNote[] | null | undefined> {
    return await prisma.movementNote.findMany({
      where: {
        movement_id: movementId,
      },
      orderBy: {
        date: 'desc',
      },
    });
  }
}
