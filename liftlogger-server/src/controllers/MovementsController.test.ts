import MovementsController from './MovementsController';
import PrismaUtils from '../utils/PrismaUtils';
import { getMovementsFixture, groupsForMovementsFixture } from '../fixtures/MovementFixtures';
import { MovementCreationParams } from '../models/MovementModel';
import { MuscleGroupForMovementModel } from '../models/MuscleGroupModel';

const prisma = PrismaUtils.getPrismaTestingInstance();
const controller = new MovementsController(prisma);

describe('MovementsController', () => {
  afterAll(() => {
    prisma.$disconnect();
  });

  describe('getMovement', () => {
    it('should return null when movement is not found', async () => {
      const promise = await controller.getMovement(99, 'testing@test.com');

      await expect(promise).toBeNull();
    });

    it('should get the correct movement for a specific id and user email', async () => {
      let result = await controller.getMovement(1, 'testing@test.com');
      expect(result?.id).toEqual(getMovementsFixture()[0].id);

      result = await controller.getMovement(9, 'testing@test.com');
      expect(result?.id).toEqual(getMovementsFixture()[8].id);

      result = await controller.getMovement(21, 'testing@test.com');
      expect(result?.id).toEqual(getMovementsFixture()[20].id);
    });

    it('should include groups', async () => {
      let result = await controller.getMovement(1, 'testing@test.com');

      expect(result).toHaveProperty('groups');
    });
  });

  describe('getMovementsFromUser', () => {
    it('should get all the movements for a user', async () => {
      const expectedResults: { inputEmail: string; outputLength: number }[] = [
        {
          inputEmail: 'testing@test.com',
          outputLength: 25,
        },
        {
          inputEmail: 'another@test.com',
          outputLength: 0,
        },
      ];

      expectedResults.forEach(async expected => {
        const result = await controller.getMovementsFromUser(expected.inputEmail);

        expect(result).toHaveLength(expected.outputLength);
      });
    });
  });

  describe('createMovement', () => {
    it('should create a movement', async () => {
      const newMovement: MovementCreationParams = {
        name: 'Testing movement',
        description: 'This is a movement to test the movement creation',
        user_email: 'second@test.com',
      };

      const groups: MuscleGroupForMovementModel[] = [
        { group_id: 5, is_primary: false },
        { group_id: 7, is_primary: true },
      ];

      const result = await controller.createMovement(newMovement, groups);

      expect(result.id).toBeTruthy();
      expect(result.name).toBe(newMovement.name);
      expect(result.description).toBe(newMovement.description);
      expect(result.primary_group_id).toBe(7);
      expect(result.user_email).toBe('second@test.com');

      // delete test movement
      await prisma.movement.delete({ where: { id: result.id } });
    });
  });

  describe('getMovementJournal', () => {
    it('should group all the liftingsessions of a movement into the result journal', async () => {
      const expectedResults: { movementId: number; sessionsCount: number }[] = [
        {
          movementId: 1,
          sessionsCount: 5,
        },
        {
          movementId: 2,
          sessionsCount: 4,
        },
        {
          movementId: 10,
          sessionsCount: 2,
        },
        {
          movementId: 99,
          sessionsCount: 0,
        },
      ];

      expectedResults.forEach(async expected => {
        const result = await controller.getMovementJournal(expected.movementId, 'testing@test.com');
        expect(result).toHaveLength(expected.sessionsCount);
      });
    });

    it('should group all the liftingsets of a movement into the journal', async () => {
      const result = await controller.getMovementJournal(2, 'testing@test.com');
      const totalSets = result.flatMap(entry => entry.session.sets);
      expect(totalSets).toHaveLength(7);
    });

    it('should group all the liftingsets into their corresponding liftingsession', async () => {
      const result = await controller.getMovementJournal(2, 'testing@test.com');
      result.forEach(entry => {
        entry.session.sets.forEach(set => {
          expect(set.session_id).toBe(entry.session.id);
        });
      });
    });
  });
});
