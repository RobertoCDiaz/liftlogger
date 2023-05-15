import { MuscleGroup, PrismaClient } from '@prisma/client';
import moment from 'moment';
import {
  MuscleGroupCreationParams,
  WithMuscleGroupMetadata,
  MuscleGroupMetadata,
} from '../models/MuscleGroupModel';

export default class MuscleGroupController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Gets all the groups stored in DB from the provided user.
   *
   * @param userEmail Email of the user whose MuscleGroups are to be fetched.
   * @param withMovements Whether the groups should be fetched along their movements or not. Defaults to `false`.
   * @param withMetadata Whether the response MuscleGroups should have their metadata or not. Defaults to `false`.
   * @returns List of groups.
   */
  async getMuscleGroupsFromUser(
    userEmail: string,
    withMovements: boolean = false,
    withMetadata: boolean = false,
  ): Promise<WithMuscleGroupMetadata<MuscleGroup>[]> {
    const muscleGroups: WithMuscleGroupMetadata<MuscleGroup>[] =
      await this.prisma.muscleGroup.findMany({
        where: {
          user_email: userEmail,
        },
        include: {
          movements: withMovements && {
            include: {
              groups: true,
            },
          },
        },
      });

    if (withMetadata) {
      for (let i = 0; i < muscleGroups.length; ++i) {
        const group = muscleGroups[i];

        group.metadata = await this.getMuscleGroupMetadata(group.id);
      }
    }

    return muscleGroups;
  }

  /**
   * Fetches the metadata for a specific MuscleGroup
   *
   * @param groupId Muscle Group Identifier
   * @returns Metadata information
   */
  async getMuscleGroupMetadata(groupId: number): Promise<MuscleGroupMetadata> {
    const sessions = await this.prisma.liftingSession.findMany({
      where: {
        sets: {
          some: {
            movement: {
              groups: {
                some: {
                  id: groupId,
                },
              },
            },
          },
        },
      },
      include: {
        sets: {
          where: {
            movement: {
              groups: {
                some: {
                  id: groupId,
                },
              },
            },
          },
        },
      },
      orderBy: {
        start_time: 'desc',
      },
    });

    const lastTrained = sessions[0]?.start_time;

    const trainedDates: Record<string, number> = {};

    sessions.forEach(session => {
      const date: string = moment(session.start_time).format('YYYY-MM-DD');

      if (!trainedDates[date]) {
        trainedDates[date] = 0;
      }

      trainedDates[date] += session.sets.length;
    });

    const movementCount = await this.prisma.movement.count({
      where: { groups: { some: { id: groupId } } },
    });

    return {
      last_trained: lastTrained,
      movements_count: movementCount,
      trained_dates: trainedDates,
    };
  }

  /**
   * Gets a specific MuscleGroup from DB.
   *
   * @param id ID of the group to be found.
   * @param userEmail Owner's email.
   * @returns The MuscleGroup that matches the provided ID. Null if not found.
   */
  async getMuscleGroup(id: number, userEmail: string): Promise<MuscleGroup | null> {
    return await this.prisma.muscleGroup.findFirstOrThrow({
      where: {
        id: id,
        user_email: userEmail,
      },
    });
  }

  /**
   * Inserts a new group in DB.
   *
   * @param group Data for the group to be created.
   * @returns Created group.
   */
  async createGroup(group: MuscleGroupCreationParams): Promise<MuscleGroup> {
    return await this.prisma.muscleGroup.create({
      data: group,
    });
  }
}
