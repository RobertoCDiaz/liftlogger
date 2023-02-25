import { MuscleGroup } from "@prisma/client";
import { Body, Controller, Get, Path, Post, Query, Route } from "tsoa";
import MuscleGroupController from "../controllers/MuscleGroupsController";
import { MuscleGroupCreationParams } from "../models/MuscleGroup";

@Route('groups')
export class GroupsRoutes extends Controller {
  @Get('')
  public async getGroups(): Promise<MuscleGroup[]> {
    return MuscleGroupController.getAll();
  }

  @Get('{id}')
  public async getGroup(
    @Path() id: number
  ): Promise<MuscleGroup | null> {
    return MuscleGroupController.get(id);
  }

  @Post()
  public async createGroup(
    @Body() requestBody: MuscleGroupCreationParams
  ): Promise<MuscleGroup> {
    const newGroup = await MuscleGroupController.createGroup(requestBody)

    this.setStatus(200);

    return newGroup;
  }
}
