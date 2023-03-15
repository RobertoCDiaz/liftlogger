import { LiftingSession } from '@prisma/client';
import * as express from 'express';
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route } from "tsoa";
import LiftingSessionController from '../controllers/LiftingSessionsController';
import { shouldBeAuthenticated } from "../middlewares/auth";
import { LiftingSessionCreationParams, LiftingSessionWithSetsCreationRequestParams } from '../models/LiftingSessionModel';
import { AuthService } from '../services/AuthService';

@Route('sessions')
export class LiftingSessionsRoutes extends Controller {
  /**
   * Request to fetch a single Lifting Session from DB along the Lifting Sets
   * that are part of it.
   *
   * @param id Liftin Session identifier
   * @param req Request object
   * @returns The requested Lifting Session, or nothing if no match was found.
   */
  @Get('{id}')
  @Middlewares([shouldBeAuthenticated])
  async getSession(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<LiftingSession | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return await LiftingSessionController.get(id, email);
  }

  /**
   * Request to fetch all the Lifting Sessions of the logged user, along with
   * the Lifting Sets that conform them.
   *
   * @param req Request object
   * @returns The list of the current's user Lifting Sessions
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  async getSessions(
    @Request() req: express.Request
  ): Promise<LiftingSession[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return await LiftingSessionController.getAll(email);
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
  @Middlewares([shouldBeAuthenticated])
  async createSession(
    @Body() body: LiftingSessionWithSetsCreationRequestParams,
    @Request() req: express.Request
  ): Promise<LiftingSession | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const session = {
      ...body.session,
      user_email: email
    } satisfies LiftingSessionCreationParams;

    return await LiftingSessionController.createSessionWithSets(session, body.sets);
  }
}