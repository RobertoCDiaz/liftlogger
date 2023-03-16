import { Movement, PrismaClient } from "@prisma/client";
import { MovementCreationParams } from "../models/MovementModel";
import { MuscleGroupForMovementModel } from "../models/MuscleGroupModel";

const prisma = new PrismaClient();

export default class MovementsController {
  /**
   * Fetches a movement from DB. It makes sure that the movement belongs to the
   * provided user email.
   *
   * @param movementId: Id of the movement to be fetched.
   * @param userEmail Owner's email.
   * @returns The fetched movement, or nothing if no match was found.
   */
  static async getMovement(movementId: number, userEmail: string): Promise<Movement | null | undefined> {
    const movements = await prisma.movement.findFirst({
      where: {
        id: movementId,
        user_email: userEmail,
      },
      include: {
        group_movements: {
          select: {
            is_primary_group: true,
            group: true,
          },
        },
      },
    });

    return movements;
  }

  /**
   * Fetches the movements of a user. It already includes the groups it belongs to, and
   * whether they are a primary group or not.
   *
   * @param userEmail Email of the user whose movements are to be fetched.
   * @returns
   */
  static async getMovementsFromUser(userEmail: string): Promise<Movement[] | null | undefined> {
    const movements = await prisma.movement.findMany({
      where: {
        user_email: userEmail,
      },
      include: {
        group_movements: {
          select: {
            is_primary_group: true,
            group: true,
          },
        },
      },
    });

    return movements;
  }

  /**
   * Makes a new Movement entry in DB.
   *
   * @param movement Data for the new movement
   * @param muscleGroups A list of MuscleGroups ids the new movement belong to, and whether they primary groups or not.
   * @returns Newly created movement
   */
  static async createMovement(movement: MovementCreationParams, muscleGroups: MuscleGroupForMovementModel[]): Promise<Movement> {
    const newMovement = await prisma.movement.create({ data: movement });

    await this.setMuscleGroupsForMovement(newMovement.id, muscleGroups, newMovement.user_email)

    return newMovement;
  }

  /**
   * Sets the MuscleGroups for a Movement, and whether they are a primary group or not.
   *
   * @param movementId Movement ID.
   * @param movementGroups List of groups for the movement.
   * @param userEmail Owner of the movement/groups.
   */
  private static async setMuscleGroupsForMovement(movementId: number, movementGroups: MuscleGroupForMovementModel[], userEmail: string) {
    const movement = await prisma.movement.findFirst({ where: { id: movementId, user_email: userEmail } });
    const groups = await prisma.muscleGroup.findMany({ where: { id: { in: movementGroups.map(group => group.group_id) }, user_email: userEmail } });

    if (!movement || (groups.length !== movementGroups.length)) {
      console.log('mal')
      return;
    }

    await prisma.groupMovements.createMany({
      data: movementGroups.map(group => ({
        movement_id: movementId,
        group_id: group.group_id,
        is_primary_group: group.is_primary,
      }))
    });
  }
}
