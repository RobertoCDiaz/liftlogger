import * as express from 'express';
import { Movement, MovementNote } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Path, Post, Query, Request, Route } from 'tsoa';
import MovementsController from '../controllers/MovementsController';
import { MovementCreationParams, MovementCreationRequestParams } from '../models/MovementModel';
import { authenticationMiddleware } from '../middlewares/auth';
import MovementNotesController from '../controllers/MovementNotesController';
import { MovementJournalEntry } from '../models/MovementJournal';
import PrismaUtils from '../utils/PrismaUtils';

@Route('movements')
export class MovementRoutes extends Controller {
  movementsController: MovementsController = new MovementsController(
    PrismaUtils.getPrismaInstance(),
  );

  notesController: MovementNotesController = new MovementNotesController(
    PrismaUtils.getPrismaInstance(),
  );

  /**
   * Gets a specific movement, only if the current user owns it.
   *
   * @param id Identifier of the movement
   * @param req Request object
   * @returns A list of movements, or nothing if the fetching was not possible.
   */
  @Get('{id}')
  @Middlewares([authenticationMiddleware])
  public async getMovement(
    @Path() id: number,
    @Request() req: express.Request,
  ): Promise<Movement | null | undefined> {
    return this.movementsController.getMovement(id, req.user_email);
  }

  /**
   * Gets a list of all the user's Movements.
   *
   * @param req Request object
   * @returns A list of movements, or nothing if the fetching was not possible
   */
  @Get('')
  @Middlewares([authenticationMiddleware])
  public async getUserMovements(
    @Request() req: express.Request,
  ): Promise<Movement[] | null | undefined> {
    return this.movementsController.getMovementsFromUser(req.user_email);
  }

  /**
   * Creates a new Movement entry in DB.
   *
   * @param body Body of the POST request
   * @param req Request object
   * @returns The new movement entry
   */
  @Post('')
  @Middlewares([authenticationMiddleware])
  public async createMovement(
    @Body() body: MovementCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Movement | undefined> {
    const movementCreationData = {
      ...body.movement,
      user_email: req.user_email,
    } satisfies MovementCreationParams;

    return this.movementsController.createMovement(movementCreationData, body.muscleGroups);
  }

  /**
   * Requests to return a list of all the Movement Notes for a Movement.
   *
   * @param id Movement whose notes will be requested
   * @param req Request object
   * @returns List of all the MovementNotes
   */
  @Get('{id}/notes')
  @Middlewares([authenticationMiddleware])
  public async getMovementNotes(
    @Path() id: number,
    @Request() req: express.Request,
  ): Promise<MovementNote[] | null | undefined> {
    const movement = await this.movementsController.getMovement(id, req.user_email);

    if (!movement) {
      this.setStatus(404);
      return;
    }

    return await this.notesController.getMovementNotes(movement.id);
  }

  /**
   * Requests for the workout journal of a Movement.
   *
   * A Workout Journal of a Movement is the list of Lifting Sessions in which the
   * Movement was trained in, along with the sets of every Lifting Session for that Movement.
   *
   * @param id Identifier of the Movement which journal is to be retrieved
   * @param req Request object
   * @returns The workout journal
   */
  @Get('{id}/journal')
  @Middlewares([authenticationMiddleware])
  public async getMovementJournal(
    @Path() id: number,
    @Query() recentsFirst: boolean = false,
    @Request() req: express.Request,
  ): Promise<MovementJournalEntry[] | null | undefined> {
    return this.movementsController.getMovementJournal(id, req.user_email, recentsFirst);
  }
}
