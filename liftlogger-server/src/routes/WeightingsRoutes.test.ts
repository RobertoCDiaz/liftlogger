import { Weighting } from '@prisma/client';
import { WeightingRoutes } from './WeightingsRoutes';
import { WeightingController } from '../controllers/WeightingController';
import { weightingFixtures } from '../fixtures/WeightingFixtures';
import { emailRequestMock } from '../mocks/request.mock';
import { WeightingCreationRequestParams } from '../models/WeightingModel';
import { usersFixture } from '../fixtures/UserFixtures';

describe('WeightingRoutes', () => {
  let routesController: WeightingRoutes;

  let weightingController: WeightingController;

  const testUser = usersFixture[0];

  beforeEach(() => {
    routesController = new WeightingRoutes();

    weightingController = routesController.weightingController;
  });

  describe('getWeightings()', () => {
    it('should call the controller to get user weightings and return its response', async () => {
      const getEntriesSpy = jest
        .spyOn(weightingController, 'getEntries')
        .mockResolvedValue(weightingFixtures);

      const result = await routesController.getWeightings(emailRequestMock);

      expect(result).toEqual(weightingFixtures);
      expect(getEntriesSpy).toBeCalledWith(testUser.email);
    });
  });

  describe('createWeighting()', () => {
    const testResult: Weighting = weightingFixtures[0];
    const testEntry: WeightingCreationRequestParams = testResult as WeightingCreationRequestParams;

    it('should try to create a new entry', async () => {
      const createEntrySpy = jest
        .spyOn(weightingController, 'createEntry')
        .mockResolvedValue(testResult);

      const result = await routesController.createWeighting(testEntry, emailRequestMock);

      expect(createEntrySpy).toHaveBeenCalled();
      expect(result).toEqual(testResult);
    });
  });
});
