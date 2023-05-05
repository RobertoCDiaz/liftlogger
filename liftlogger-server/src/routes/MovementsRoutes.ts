import * as express from 'express';
import { Movement, MovementNote } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Path, Post, Query, Request, Route } from 'tsoa';
import MovementsController from '../controllers/MovementsController';
import { MovementCreationParams, MovementCreationRequestParams } from '../models/MovementModel';
import { AuthService } from '../services/AuthService';
import { shouldBeAuthenticated } from '../middlewares/auth';
import MovementNotesController from '../controllers/MovementNotesController';
import { MovementJournalEntry } from '../models/MovementJournal';
import PrismaUtils from '../utils/PrismaUtils';

@Route('movements')
export class MovementRoutes extends Controller {
  /**
   * Gets a specific movement, only if the current user owns it.
   *
   * @param id Identifier of the movement
   * @param req Request object
   * @returns A list of movements, or nothing if the fetching was not possible.
   */
  @Get('{id}')
  @Middlewares([shouldBeAuthenticated])
  public async getMovement(
    @Path() id: number,
    @Request() req: express.Request,
  ): Promise<Movement | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return new MovementsController(PrismaUtils.getPrismaInstance()).getMovement(id, email);
  }

  /**
   * Gets a list of all the user's Movements.
   *
   * @param req Request object
   * @returns A list of movements, or nothing if the fetching was not possible
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  public async getUserMovements(
    @Request() req: express.Request,
  ): Promise<Movement[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return new MovementsController(PrismaUtils.getPrismaInstance()).getMovementsFromUser(email);
  }

  /**
   * Creates a new Movement entry in DB.
   *
   * @param body Body of the POST request
   * @param req Request object
   * @returns The new movement entry
   */
  @Post('')
  @Middlewares([shouldBeAuthenticated])
  public async createMovement(
    @Body() body: MovementCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Movement | undefined> {
    if (!req.auth) {
      return;
    }

    const userInfo = await AuthService.getUserInfo(req.auth.token);

    const movementCreationData = {
      ...body.movement,
      user_email: userInfo.email,
    } satisfies MovementCreationParams;

    return new MovementsController(PrismaUtils.getPrismaInstance()).createMovement(
      movementCreationData,
      body.muscleGroups,
    );
  }

  /**
   * Requests to return a list of all the Movement Notes for a Movement.
   *
   * @param id Movement whose notes will be requested
   * @param req Request object
   * @returns List of all the MovementNotes
   */
  @Get('{id}/notes')
  @Middlewares([shouldBeAuthenticated])
  public async getMovementNotes(
    @Path() id: number,
    @Request() req: express.Request,
  ): Promise<MovementNote[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const movement = new MovementsController(PrismaUtils.getPrismaInstance()).getMovement(
      id,
      email,
    );

    if (!movement) {
      this.setStatus(404);
      return;
    }

    return await MovementNotesController.getMovementNotes(id);
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
  @Middlewares([shouldBeAuthenticated])
  public async getMovementJournal(
    @Path() id: number,
    @Query() recentsFirst: boolean = false,
    @Request() req: express.Request,
  ): Promise<MovementJournalEntry[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return new MovementsController(PrismaUtils.getPrismaInstance()).getMovementJournal(
      id,
      email,
      recentsFirst,
    );
  }
}
