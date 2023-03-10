import * as express from "express";
import { Movement } from "@prisma/client";
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route } from "tsoa";
import MovementsController from "../controllers/MovementsController";
import { MovementCreationParams, MovementCreationRequestParams } from "../models/MovementModel";
import { AuthService } from "../services/AuthService";
import { shouldBeAuthenticated } from "../middlewares/auth";

@Route('movements')
export class MovementRoutes extends Controller {
  /**
   * Gets a specific movement, only if the current user owns it.
   *
   * @param req Request object.
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

    return MovementsController.getMovement(id, email);
  }

  /**
   * Gets a list of all the user's Movements.
   *
   * @param req Request object.
   * @returns A list of movements, or nothing if the fetching was not possible.
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

    return MovementsController.getMovementsFromUser(email);
  }

  /**
   * Creates a new Movement entry in DB.
   *
   * @param body Body of the POST request.
   * @param req Request object.
   * @returns The new movement entry.
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

    return MovementsController.create(movementCreationData, body.muscleGroups);
  }
}
