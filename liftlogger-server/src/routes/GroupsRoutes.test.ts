import MuscleGroupController from '../controllers/MuscleGroupsController';
import { getMuscleGroupsFixture } from '../fixtures/MuscleGroupFixtures';
import { getUsersFixture } from '../fixtures/UserFixtures';
import { emailRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
import { GroupsRoutes } from './GroupsRoutes';

describe('GroupsRoutes', () => {
  let routesController: GroupsRoutes;

  let muscleGroupController: MuscleGroupController;

  const testUser = getUsersFixture()[0];

  beforeEach(() => {
    routesController = new GroupsRoutes();

    muscleGroupController = routesController.muscleGroupController;
  });

  describe('getGroups()', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest
        .spyOn(muscleGroupController, 'getMuscleGroupsFromUser')
        .mockResolvedValue(getMuscleGroupsFixture());
    });

    it('should ask controller for user groups and return its response', async () => {
      const result = await routesController.getGroups(undefined, undefined, emailRequestMock);

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(getMuscleGroupsFixture());
    });

    it('should ask to include movements if specified', async () => {
      await routesController.getGroups(true, undefined, emailRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, true, false);
    });

    it('should ask to not include movements if specified', async () => {
      await routesController.getGroups(false, undefined, emailRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, false, false);
    });

    it('should ask to include metadata if specified', async () => {
      await routesController.getGroups(undefined, true, emailRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, false, true);
    });

    it('should ask to not include metadata if specified', async () => {
      await routesController.getGroups(undefined, false, emailRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, false, false);
    });
  });

  describe('getGroup()', () => {
    it('should ask controller for a group and return its response', async () => {
      const testGroup = getMuscleGroupsFixture()[0];
      const spy = jest.spyOn(muscleGroupController, 'getMuscleGroup').mockResolvedValue(testGroup);

      const result = await routesController.getGroup(
        testGroup.id,
        undefined,
        undefined,
        emailRequestMock,
      );

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testGroup);
    });
  });

  describe('createGroup()', () => {
    it('should call controller to create a new group and return it', async () => {
      const testGroup = getMuscleGroupsFixture()[1];

      const spy = jest.spyOn(muscleGroupController, 'createGroup').mockResolvedValue(testGroup);

      const result = await routesController.createGroup(
        { ...testGroup, parent_group_id: undefined },
        emailRequestMock,
      );

      expect(spy).toHaveBeenCalled();
      expect(result?.id).toBe(testGroup.id);
    });
  });
});
