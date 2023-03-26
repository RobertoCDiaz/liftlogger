import { LiftingSession, PrismaClient } from '@prisma/client';
import { LiftingSessionCreationParams } from '../models/LiftingSessionModel';
import { LiftingSetCreationParams } from '../models/LiftingSetModel';

const prisma = new PrismaClient();

export default class LiftingSessionController {
  /**
   * Fetches a single Lifting Session from DB.
   *
   * @param sessionId Session to fetch
   * @param userEmail Owner's email
   * @returns The fetched session, or nothing if not found
   */
  static async get(
    sessionId: number,
    userEmail: string,
  ): Promise<LiftingSession | null | undefined> {
    return await prisma.liftingSession.findFirst({
      where: {
        id: sessionId,
        user_email: userEmail,
      },
      include: {
        sets: true,
      },
    });
  }

  /**
   * Gets all the Lifting Sessions from a user.
   *
   * @param userEmail Email of the user whose sessions are to be fetched
   * @returns List of the user's sessions
   */
  static async getAll(userEmail: string): Promise<LiftingSession[] | null | undefined> {
    return await prisma.liftingSession.findMany({
      where: {
        user_email: userEmail,
      },
      include: {
        sets: true,
      },
    });
  }

  /**
   * Creates a new Lifting Session, along with the Lifting Sets that will be a part of it.
   *
   * @param session Data for the session to be created
   * @param sets List of sets that were made in the session
   * @returns The created data, directly from DB
   */
  static async createSessionWithSets(
    session: LiftingSessionCreationParams,
    sets: LiftingSetCreationParams[],
  ): Promise<LiftingSession | null | undefined> {
    return await prisma.liftingSession.create({
      data: {
        ...session,
        sets: {
          createMany: {
            data: sets,
          },
        },
      },
      include: {
        sets: true,
      },
    });
  }
}
