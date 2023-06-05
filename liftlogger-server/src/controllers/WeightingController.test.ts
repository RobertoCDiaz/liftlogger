import { newWeightingsFixture, weightingFixtures } from '../fixtures/WeightingFixtures';
import { WeightingCreationParams } from '../models/WeightingModel';
import PrismaUtils from '../utils/PrismaUtils';
import { WeightingController } from './WeightingController';

const prisma = PrismaUtils.getPrismaTestingInstance();
const controller = new WeightingController(prisma);

describe('WeightingController', () => {
  afterAll(() => {
    prismaInstance.$disconnect();
  });

  describe('getEntries()', () => {
    it('should fetch all the weighting entries of a user', async () => {
      const testEmail = 'testing@test.com';
      const testEntries = weightingFixtures.filter(entry => entry.user_email === testEmail);

      const result = await controller.getEntries(testEmail);

      expect(result).toEqual(testEntries);
    });
    it('should return empty list if not weightings for a user were found', async () => {
      const testEmail = 'not-an-email@test.com';

      const result = await controller.getEntries(testEmail);

      expect(result).toHaveLength(0);
    });
  });

  describe('createEntry()', () => {
    it('should create a new weighting entry for a user', async () => {
      const testInputs: WeightingCreationParams[] = newWeightingsFixture;

      for (let i = 0; i < testInputs.length; ++i) {
        const entry = testInputs[i];

        const result = await controller.createEntry(entry);

        expect(result.weight).toBe(entry.weight);

        await prisma.weighting.delete({ where: { id: result.id } });
      }
    });
  });
});
