import { muscleGroupsFixture } from '../fixtures/MuscleGroupFixtures';
import { MuscleGroupCreationParams } from '../models/MuscleGroupModel';
import PrismaUtils from '../utils/PrismaUtils';
import MuscleGroupController from './MuscleGroupsController';

const prisma = PrismaUtils.getPrismaTestingInstance();
const controller = new MuscleGroupController(prisma);

describe('MuscleGroupController', () => {
  afterAll(() => {
    prisma.$disconnect();
  });

  describe('getMuscleGroupsFromUser', () => {
    it('should get all the muscle groups from an user', () => {
      const expectedResults: { userEmail: string; groupsCount: number }[] = [
        {
          userEmail: 'testing@test.com',
          groupsCount: 4,
        },
        {
          userEmail: 'second@test.com',
          groupsCount: 4,
        },
        {
          userEmail: 'another@test.com',
          groupsCount: 0,
        },
      ];

      expectedResults.forEach(async expected => {
        const result = await controller.getMuscleGroupsFromUser(expected.userEmail);

        expect(result).toHaveLength(expected.groupsCount);
      });
    });

    it('should NOT include movements if flag is set to false', async () => {
      const groups = await controller.getMuscleGroupsFromUser('testing@test.com', false);

      expect(groups[0]).not.toHaveProperty('movements');
    });

    it('should include movements if flag is set to true', async () => {
      const groups = await controller.getMuscleGroupsFromUser('testing@test.com', true);

      expect(groups[0]).toHaveProperty('movements');
    });

    it('should NOT include metadata if flag is set to false', async () => {
      const groups = await controller.getMuscleGroupsFromUser('testing@test.com', false, false);

      expect(groups[0]).not.toHaveProperty('metadata');
    });

    it('should include metadata if flag is set to true', async () => {
      const groups = await controller.getMuscleGroupsFromUser('testing@test.com', false, true);

      expect(groups[0]).toHaveProperty('metadata');
    });
  });

  describe('getMuscleGroup', () => {
    it('should return the correct muscle group for a given id', async () => {
      const result = await controller.getMuscleGroup(1, 'testing@test.com');

      expect(result).toEqual(muscleGroupsFixture[0]);
    });

    it('should throw error if no match for id and user email is provided', async () => {
      const promise = controller.getMuscleGroup(1, 'second@test.com');

      await expect(promise).rejects.toThrowError();
    });
  });

  describe('createGroup', () => {
    const newGroup: MuscleGroupCreationParams = {
      name: 'Test Muscle Group',
      description: 'Testing Muscle Group creation',
      user_email: 'another@test.com',
    };

    it('should insert muscle groups', async () => {
      const result = await controller.createGroup(newGroup);

      expect(result.name).toBe(newGroup.name);
      expect(result.description).toBe(newGroup.description);

      await prisma.muscleGroup.delete({ where: { id: result.id } });
    });

    it('should be able to create subgroups', async () => {
      const result = await controller.createGroup({
        ...newGroup,
        parent_group_id: 1,
        user_email: 'testing@test.com',
      });

      expect(result.parent_group_id).toBe(1);

      const parentGroup = await prisma.muscleGroup.findUniqueOrThrow({
        where: { id: 1 },
        include: { groups: true },
      });

      expect(parentGroup.groups).toContainEqual(result);

      await prisma.muscleGroup.delete({ where: { id: result.id } });
    });
  });

  describe('getMuscleGroupMetadata', () => {
    it("should correctly fetch a group's metadata", async () => {
      const testGroup = muscleGroupsFixture[0];
      const expectedCount = 16;
      const expectedDate = new Date('2023-01-02T15:46:12.167Z');

      const result = await controller.getMuscleGroupMetadata(testGroup.id);

      expect(result.movements_count).toBe(expectedCount);
      expect(result.last_trained).toEqual(expectedDate);
    });
  });
});
