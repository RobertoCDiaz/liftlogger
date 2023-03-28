import * as express from 'express';
import { Note } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa';
import { shouldBeAuthenticated } from '../middlewares/auth';
import { AuthService } from '../services/AuthService';
import NotesController from '../controllers/NotesController';
import { NoteCreationRequestParams } from '../models/NoteModel';

@Route('notes')
export class NotesRoutes extends Controller {
  /**
   * Request to fetch all the current user's Notes
   *
   * @param req Request object
   * @returns All of the notes of the current user
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  async getNotes(@Request() req: express.Request): Promise<Note[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return NotesController.getNotesFromUser(email);
  }

  /**
   * Request to create a new Note
   *
   * @param note Note to be created
   * @param req Request object
   * @returns New Note entry
   */
  @Post('')
  @Middlewares([shouldBeAuthenticated])
  async createNote(
    @Body() note: NoteCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Note | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    // sets current date if no date was included in request body
    const noteDate = note.date ?? new Date();

    return NotesController.createNote({ ...note, user_email: email, date: noteDate });
  }
}
