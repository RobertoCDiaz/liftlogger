import { LiftingSession } from '@prisma/client';
import * as express from 'express';
import { Body, Controller, Get, Middlewares, Path, Post, Query, Request, Route } from 'tsoa';
import LiftingSessionController from '../controllers/LiftingSessionsController';
import { authenticationMiddleware } from '../middlewares/auth';
import {
  LiftingSessionCreationParams,
  LiftingSessionWithSetsCreationRequestParams,
} from '../models/LiftingSessionModel';
import PrismaUtils from '../utils/PrismaUtils';

@Route('sessions')
export class LiftingSessionsRoutes extends Controller {
  /**
   * Request to fetch a single Lifting Session from DB along the Lifting Sets
   * that are part of it.
   *
   * @param id Liftin Session identifier
   * @param includeSets Whether to include sets in the response or not. Default to `true`
   * @param req Request object
   * @returns The requested Lifting Session, or nothing if no match was found.
   */
  @Get('{id}')
  @Middlewares([authenticationMiddleware])
  async getSession(
    @Path() id: number,
    @Query() includeSets: boolean = true,
    @Request() req: express.Request,
  ): Promise<LiftingSession | null | undefined> {
    return await new LiftingSessionController(PrismaUtils.getPrismaInstance()).getLiftingSession(
      id,
      req.user_email,
      includeSets,
    );
  }

  /**
   * Request to fetch all the Lifting Sessions of the logged user, along with
   * the Lifting Sets that conform them.
   *
   * @param includeSets Whether to include sets in the response or not. Default to `true`
   * @param req Request object
   * @returns The list of the current's user Lifting Sessions
   */
  @Get('')
  @Middlewares([authenticationMiddleware])
  async getSessions(
    @Query() includeSets: boolean = true,
    @Request() req: express.Request,
  ): Promise<LiftingSession[] | null | undefined> {
    return await new LiftingSessionController(
      PrismaUtils.getPrismaInstance(),
    ).getLiftingSessionsFromUser(req.user_email, includeSets);
  }

  /**
   * Request to create a new Lifting Session. The sets from that session must also be included
   * in this same request.
   *
   * @param body Data for the session and the sets it will be associated with
   * @param req Request object
   * @returns If successful, the created Lifting Session.
   */
  @Post('')
  @Middlewares([authenticationMiddleware])
  async createSession(
    @Body() body: LiftingSessionWithSetsCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<LiftingSession | null | undefined> {
    const session = {
      ...body.session,
      user_email: req.user_email,
    } satisfies LiftingSessionCreationParams;

    return await new LiftingSessionController(
      PrismaUtils.getPrismaInstance(),
    ).createSessionWithSets(session, body.sets);
  }
}
