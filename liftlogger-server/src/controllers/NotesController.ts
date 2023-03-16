import { Note, PrismaClient } from "@prisma/client";
import { NoteCreationParams } from "../models/NoteModel";

const prisma = new PrismaClient();

export default class NotesController {
  /**
   * Fetches all the notes from a user. A date interval can be set, so that only
   * Notes between `startDate` and `endDate` are fetched
   *
   * @param userEmail Owner of the notes
   * @param startDate Earlier note date to fetch.
   * @param endDate Later note date to fetch.
   * @returns All of the user's notes
   */
  static async getNotesFromUser(userEmail: string, startDate?: number, endDate?: number): Promise<Note[] | null | undefined> {
    const isIntervalProvided = !!startDate && !!endDate;

    return await prisma.note.findMany({
      where: {
        user_email: userEmail,
        date: isIntervalProvided ? {
          gte: startDate,
          lte: endDate,
        } : undefined
      },
    });
  }

  /**
   * Inserts a new Note into DB.
   *
   * @param note Data to create the new Note
   * @returns New Note DB entry
   */
  static async createNote(note: NoteCreationParams): Promise<Note | null | undefined> {
    return await prisma.note.create({
      data: note,
    });
  }
}
