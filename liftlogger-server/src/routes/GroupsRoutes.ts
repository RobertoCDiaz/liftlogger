import * as express from 'express';
import { MuscleGroup } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Path, Post, Query, Request, Route } from 'tsoa';
import MuscleGroupController from '../controllers/MuscleGroupsController';
import { MuscleGroupCreationParams, WithMuscleGroupMetadata } from '../models/MuscleGroupModel';
import { ModelRequestParams } from '../utils/ModelRequestParams';
import { authenticationMiddleware } from '../middlewares/auth';
import PrismaUtils from '../utils/PrismaUtils';

@Route('groups')
export class GroupsRoutes extends Controller {
  muscleGroupController: MuscleGroupController = new MuscleGroupController(
    PrismaUtils.getPrismaInstance(),
  );

  /**
   * Fetches the MuscleGroups DB table for all its content.
   *
   * @param withMovements Whether the groups should be fetched along their movements or not. Defaults to `false`.
   * @param withMetadata Whether the response MuscleGroups should have their metadata or not. Defaults to `false`.
   * @returns All the Muscle Groups stored in DB.
   */
  @Get('')
  @Middlewares([authenticationMiddleware])
  public async getGroups(
    @Query() withMovements: boolean = false,
    @Query() withMetadata: boolean = false,
    @Request() req: express.Request,
  ): Promise<WithMuscleGroupMetadata<MuscleGroup>[] | null | undefined> {
    return await this.muscleGroupController.getMuscleGroupsFromUser(
      req.user_email,
      withMovements,
      withMetadata,
    );
  }

  /**
   * Fetches a single group from DB.
   *
   * @param id ID of the group to be fetched.
   * @param withMovements Whether the Muscle Group should be fetched along its movements or not. Defaults to `false`.
   * @param withMetadata Whether the MuscleGroup should have its metadata or not. Defaults to `false`.
   * @returns A group with the fetched `id`. `null` if not found.
   */
  @Get('{id}')
  @Middlewares([authenticationMiddleware])
  public async getGroup(
    @Path() id: number,
    @Query() withMovements: boolean = false,
    @Query() withMetadata: boolean = false,
    @Request() req: express.Request,
  ): Promise<WithMuscleGroupMetadata<MuscleGroup> | null | undefined> {
    const group = await this.muscleGroupController.getMuscleGroup(
      id,
      req.user_email,
      withMovements,
      withMetadata,
    );

    if (!group) {
      this.setStatus(404);
      return;
    }

    return group;
  }

  /**
   * Inserts a new MuscleGroup into DB.
   *
   * @param group Group to be created.
   * @returns DB row for the created group.
   */
  @Post()
  @Middlewares([authenticationMiddleware])
  public async createGroup(
    @Body() group: ModelRequestParams<MuscleGroupCreationParams>,
    @Request() req: express.Request,
  ): Promise<MuscleGroup | undefined> {
    return await this.muscleGroupController.createGroup({
      ...group,
      user_email: req.user_email,
    });
  }
}
