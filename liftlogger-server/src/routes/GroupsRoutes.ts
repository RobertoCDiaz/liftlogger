import * as express from 'express';
import { MuscleGroup } from "@prisma/client";
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route } from "tsoa";
import MuscleGroupController from "../controllers/MuscleGroupsController";
import { MuscleGroupCreationParams } from "../models/MuscleGroupModel";
import { AuthService } from "../services/AuthService";
import { ModelRequestParams } from "../utils/ModelRequestParams";
import { shouldBeAuthenticated } from "../middlewares/auth";

@Route('groups')
export class GroupsRoutes extends Controller {
  /**
   * Fetches the MuscleGroups DB table for all its content.
   *
   * @returns All the Muscle Groups stored in DB.
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  public async getGroups(
    @Request() req: express.Request
  ): Promise<MuscleGroup[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return MuscleGroupController.getAll(email);
  }

  /**
   * Fetches a single group from DB.
   *
   * @param id ID of the group to be fetched.
   * @returns A group with the fetched `id`. `null` if not found.
   */
  @Get('{id}')
  @Middlewares([shouldBeAuthenticated])
  public async getGroup(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<MuscleGroup | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return MuscleGroupController.get(id, email);
  }

  /**
   * Inserts a new MuscleGroup into DB.
   *
   * @param group Group to be created.
   * @returns DB row for the created group.
   */
  @Post()
  @Middlewares([shouldBeAuthenticated])
  public async createGroup(
    @Body() group: ModelRequestParams<MuscleGroupCreationParams>,
    @Request() req: express.Request,
  ): Promise<MuscleGroup | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const newGroup = await MuscleGroupController.createGroup({ ...group, user_email: email })

    this.setStatus(200);

    return newGroup;
  }
}
