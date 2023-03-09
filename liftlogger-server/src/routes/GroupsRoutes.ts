import { MuscleGroup } from "@prisma/client";
import { Body, Controller, Get, Path, Post, Query, Route } from "tsoa";
import MuscleGroupController from "../controllers/MuscleGroupsController";
import { MuscleGroupCreationParams } from "../models/MuscleGroupModel";

@Route('groups')
export class GroupsRoutes extends Controller {
  /**
   * Fetches the MuscleGroups DB table for all its content.
   *
   * @returns All the Muscle Groups stored in DB.
   */
  @Get('')
  public async getGroups(): Promise<MuscleGroup[]> {
    return MuscleGroupController.getAll();
  }

  /**
   * Fetches a single group from DB.
   *
   * @param id ID of the group to be fetched.
   * @returns A group with the fetched `id`. `null` if not found.
   */
  @Get('{id}')
  public async getGroup(
    @Path() id: number
  ): Promise<MuscleGroup | null> {
    return MuscleGroupController.get(id);
  }

  /**
   * Inserts a new MuscleGroup into DB.
   *
   * @param group Group to be created.
   * @returns DB row for the created group.
   */
  @Post()
  public async createGroup(
    @Body() group: MuscleGroupCreationParams
  ): Promise<MuscleGroup> {
    const newGroup = await MuscleGroupController.createGroup(group)

    this.setStatus(200);

    return newGroup;
  }
}
