import * as express from 'express';
import { Note } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa';
import { authenticationMiddleware } from '../middlewares/auth';
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
  @Middlewares([authenticationMiddleware])
  async getNotes(@Request() req: express.Request): Promise<Note[] | null | undefined> {
    return NotesController.getNotesFromUser(req.user_email);
  }

  /**
   * Request to create a new Note
   *
   * @param note Note to be created
   * @param req Request object
   * @returns New Note entry
   */
  @Post('')
  @Middlewares([authenticationMiddleware])
  async createNote(
    @Body() note: NoteCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Note | null | undefined> {
    // sets current date if no date was included in request body
    const noteDate = note.date ?? new Date();

    return NotesController.createNote({ ...note, user_email: req.user_email, date: noteDate });
  }
}
