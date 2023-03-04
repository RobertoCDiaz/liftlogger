import { MuscleGroup, PrismaClient } from "@prisma/client";
import { MuscleGroupCreationParams } from "../models/MuscleGroup";

const prisma = new PrismaClient();

export default class MuscleGroupController {
  /**
   * Gets all the groups stored in DB.
   *
   * @returns List of groups.
   */
  static async getAll(): Promise<MuscleGroup[]> {
    return await prisma.muscleGroup.findMany();
  }

  /**
   * Gets a specific MuscleGroup from DB.
   *
   * @param id ID of the group to be found.
   * @returns The MuscleGroup that matches the provided ID. Null if not found.
   */
  static async get(id: number): Promise<MuscleGroup | null> {
    return await prisma.muscleGroup.findFirst({
      where: {
        id: id,
      }
    })
  }

  /**
   * Inserts a new group in DB.
   *
   * @param group Data for the group to be created.
   * @returns Created group.
   */
  static async createGroup(group: MuscleGroupCreationParams): Promise<MuscleGroup> {
    // TODO: Create a logger class.
    console.log('🔵 Inserting new MuscleGroup...');
    console.log(group);

    return await prisma.muscleGroup.create({
      data: group,
    })
  }
}
