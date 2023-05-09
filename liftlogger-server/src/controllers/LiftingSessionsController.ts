import { LiftingSession, PrismaClient } from '@prisma/client';
import { LiftingSessionCreationParams } from '../models/LiftingSessionModel';
import { LiftingSetCreationParams } from '../models/LiftingSetModel';

export default class LiftingSessionController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches a single Lifting Session from DB.
   *
   * @param sessionId Session to fetch
   * @param userEmail Owner's email
   * @param includeSets Whether it should include all the LiftingSets from this LiftingSession. Defaults to `false`.
   * @returns The fetched session, or nothing if not found
   */
  async getLiftingSession(
    sessionId: number,
    userEmail: string,
    includeSets = false,
  ): Promise<LiftingSession> {
    return await this.prisma.liftingSession.findFirstOrThrow({
      where: {
        id: sessionId,
        user_email: userEmail,
      },
      include: {
        sets: includeSets,
      },
    });
  }

  /**
   * Gets all the Lifting Sessions from a user.
   *
   * @param userEmail Email of the user whose sessions are to be fetched
   * @param includeSets Whether it should include all the LiftingSets from the LiftingSessions. Defaults to `false`.
   * @returns List of the user's sessions
   */
  async getLiftingSessionsFromUser(
    userEmail: string,
    includeSets: boolean = false,
  ): Promise<LiftingSession[]> {
    return await this.prisma.liftingSession.findMany({
      where: {
        user_email: userEmail,
      },
      include: {
        sets: includeSets,
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
  async createSessionWithSets(
    session: LiftingSessionCreationParams,
    sets: LiftingSetCreationParams[],
  ): Promise<LiftingSession> {
    return await this.prisma.liftingSession.create({
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
