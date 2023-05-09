import { Weighting } from '@prisma/client';
import { WeightingRoutes } from './WeightingsRoutes';
import { AuthService } from '../services/AuthService';
import { WeightingController } from '../controllers/WeightingController';
import { weightingFixtures } from '../fixtures/WeightingFixtures';
import { authRequestMock, noAuthRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
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
      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
      jest.spyOn(weightingController, 'getEntries').mockResolvedValue(weightingFixtures);

      const result = await routesController.getWeightings(authRequestMock);

      expect(result).toEqual(weightingFixtures);
    });

    it('should return nothing if user not authenticated', async () => {
      const result = await routesController.getWeightings(noAuthRequestMock);

      expect(result).toBeFalsy();
    });
  });

  describe('createWeighting()', () => {
    const testResult: Weighting = weightingFixtures[0];
    const testEntry: WeightingCreationRequestParams = testResult as WeightingCreationRequestParams;

    it('should return nothing if user not authenticated', async () => {
      const result = await routesController.createWeighting(testEntry, noAuthRequestMock);

      expect(result).toBeFalsy();
    });

    it('should try to create a new entry', async () => {
      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
      const createEntrySpy = jest
        .spyOn(weightingController, 'createEntry')
        .mockResolvedValue(testResult);

      const result = await routesController.createWeighting(testEntry, authRequestMock);

      expect(createEntrySpy).toHaveBeenCalled();
      expect(result).toEqual(testResult);
    });
  });
});
