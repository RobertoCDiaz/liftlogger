import { Movement, PrismaClient } from '@prisma/client';
import { MovementCreationParams } from '../models/MovementModel';
import { MuscleGroupForMovementModel } from '../models/MuscleGroupModel';
import { MovementJournalEntry } from '../models/MovementJournal';

export default class MovementsController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches a movement from DB. It makes sure that the movement belongs to the
   * provided user email.
   *
   * @param movementId: Id of the movement to be fetched.
   * @param userEmail Owner's email.
   * @returns The fetched movement, or nothing if no match was found.
   */
  async getMovement(movementId: number, userEmail: string): Promise<Movement | null> {
    return await this.prisma.movement.findFirst({
      where: {
        id: movementId,
        user_email: userEmail,
      },
      include: {
        groups: true,
      },
    });
  }

  /**
   * Fetches the movements of a user. It already includes the groups it belongs to, and
   * whether they are a primary group or not.
   *
   * @param userEmail Email of the user whose movements are to be fetched.
   * @returns
   */
  async getMovementsFromUser(userEmail: string): Promise<Movement[]> {
    const movements = await this.prisma.movement.findMany({
      where: {
        user_email: userEmail,
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
  async createMovement(
    movement: MovementCreationParams,
    muscleGroups: MuscleGroupForMovementModel[],
  ): Promise<Movement> {
    const newMovement = await this.prisma.movement.create({
      data: {
        ...movement,
        groups: {
          connect: muscleGroups.map(group => ({ id: group.group_id })),
        },
        primary_group_id: muscleGroups.filter(group => group.is_primary)[0].group_id ?? null,
      },
    });

    return newMovement;
  }

  /**
   * Retrieves the workout journal for a Movement.
   *
   * A Workout Journal of a Movement is the list of Lifting Sessions in which the
   * Movement was trained in, along with the sets of every Lifting Session for that Movement.
   *
   * @param movementId Identifier of the Movement which journal is to be retrieved
   * @param email User email to check against
   * @param recentsFirst Whether the list should be ordered from more recent to older entries or not. Defaults to false.
   * @returns The list of LiftingSessions
   */
  async getMovementJournal(
    movementId: number,
    email: string,
    recentsFirst: boolean = false,
  ): Promise<MovementJournalEntry[]> {
    const sessions = await this.prisma.liftingSession.findMany({
      where: {
        user_email: email,
        sets: {
          some: {
            movement_id: movementId,
          },
        },
      },
      include: {
        sets: {
          where: {
            movement_id: movementId,
          },
        },
      },
      orderBy: {
        start_time: recentsFirst ? 'desc' : 'asc',
      },
    });

    // TODO: Delegate value computation to server?
    const journal: MovementJournalEntry[] = sessions.map(session => {
      let acc: number = 0;
      session.sets.forEach(set => {
        acc += Math.sqrt(set.reps) * set.weight;
      });

      return {
        value: acc / session.sets.length,
        date: session.start_time,
        movement_id: movementId,
        session: session,
      };
    });

    return journal;
  }
}
