import { LiftingSession, LiftingSet } from '@prisma/client';
import { liftingSessionsFixture } from '../fixtures/LiftingSessionFixtures';
import { LiftingSessionCreationParams } from '../models/LiftingSessionModel';
import { LiftingSetCreationParams } from '../models/LiftingSetModel';
import PrismaUtils from '../utils/PrismaUtils';
import LiftingSessionController from './LiftingSessionsController';

const prisma = PrismaUtils.getPrismaTestingInstance();
const controller = new LiftingSessionController(prisma);

describe('LiftingSessionsController', () => {
  afterAll(() => {
    prisma.$disconnect();
  });

  describe('getLiftingSession', () => {
    it('should return the correct lifting session for a given id', () => {
      const ids = [5, 1, 9, 8];

      ids.forEach(async sessionId => {
        const result = await controller.getLiftingSession(sessionId, 'testing@test.com');

        expect(result).toEqual(liftingSessionsFixture[sessionId - 1]);
      });
    });

    it('should return sets when flag is set to true', async () => {
      const result: LiftingSession & { sets?: LiftingSet } = await controller.getLiftingSession(
        1,
        'testing@test.com',
        true,
      );

      expect(result).toHaveProperty('sets');
      expect(result.sets!).toHaveLength(6);
    });

    it('should NOT return sets when flag is set to false', async () => {
      const result = await controller.getLiftingSession(1, 'testing@test.com', false);

      expect(result).not.toHaveProperty('sets');
    });

    it('should throw error if not match for session id and owner email is found', async () => {
      const promise = controller.getLiftingSession(1, 'second@testing.com');

      await expect(promise).rejects.toThrow();
    });
  });

  describe('getLiftingSessionsFromUser', () => {
    it('should return the list of all lifting sessions for a given user', () => {
      const expectedResults: { userEmail: string; sessionsCount: number }[] = [
        {
          userEmail: 'testing@test.com',
          sessionsCount: 15,
        },
        {
          userEmail: 'second@test.com',
          sessionsCount: 0,
        },
        {
          userEmail: 'another@test.com',
          sessionsCount: 0,
        },
      ];

      expectedResults.forEach(async expected => {
        const result = await controller.getLiftingSessionsFromUser(expected.userEmail);

        expect(result).toHaveLength(expected.sessionsCount);
        expect(result).toEqual(
          liftingSessionsFixture.filter(
            sessionFixture => sessionFixture.user_email === expected.userEmail,
          ),
        );
      });
    });

    it('should return sets when flag is set to true', async () => {
      const result = await controller.getLiftingSessionsFromUser('testing@test.com', true);

      expect(result[0]).toHaveProperty('sets');
    });

    it('should NOT return sets when flag is set to false', async () => {
      const result = await controller.getLiftingSessionsFromUser('testing@test.com', false);

      expect(result[0]).not.toHaveProperty('sets');
    });
  });

  describe('createSessionWithSets', () => {
    it('should succesfully create a new liftingsession with sets', async () => {
      const newSession: LiftingSessionCreationParams = {
        user_email: 'testing@test.com',
        notes: 'Testing creation of lifting sessions',
        start_time: new Date('2023-04-02T07:30:00'),
        end_time: new Date('2023-04-02T08:35:00'),
      };
      const newSets: LiftingSetCreationParams[] = [
        { movement_id: 1, reps: 11, weight: 22.5 },
        { movement_id: 1, reps: 10, weight: 22.5 },
        { movement_id: 1, reps: 10, weight: 22.5 },
      ];

      const result = await controller.createSessionWithSets(newSession, newSets);
      const resultSets = await prisma.liftingSet.findMany({ where: { session_id: result.id } });

      expect(result.user_email).toBe(newSession.user_email);
      expect(result.notes).toBe(newSession.notes);

      expect(resultSets).toHaveLength(newSets.length);

      const deleteSetsPromise = prisma.liftingSet.deleteMany({
        where: {
          session_id: result.id,
        },
      });
      const deleteSessionPromise = prisma.liftingSession.delete({ where: { id: result.id } });

      prisma.$transaction([deleteSetsPromise, deleteSessionPromise]);
    });
  });
});
