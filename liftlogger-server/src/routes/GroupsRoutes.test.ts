import MuscleGroupController from '../controllers/MuscleGroupsController';
import { muscleGroupsFixture } from '../fixtures/MuscleGroupFixtures';
import { usersFixture } from '../fixtures/UserFixtures';
import { authRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
import { AuthService } from '../services/AuthService';
import { GroupsRoutes } from './GroupsRoutes';

describe('GroupsRoutes', () => {
  let routesController: GroupsRoutes;

  let muscleGroupController: MuscleGroupController;

  const testUser = usersFixture[0];

  beforeEach(() => {
    routesController = new GroupsRoutes();

    muscleGroupController = routesController.muscleGroupController;
  });

  describe('getGroups()', () => {
    let spy: jest.SpyInstance;

    beforeEach(() => {
      spy = jest
        .spyOn(muscleGroupController, 'getMuscleGroupsFromUser')
        .mockResolvedValue(muscleGroupsFixture);

      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
    });

    it('should ask controller for user groups and return its response', async () => {
      const result = await routesController.getGroups(undefined, authRequestMock);

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(muscleGroupsFixture);
    });

    it('should ask to include movements if specified', async () => {
      await routesController.getGroups(true, authRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, true);
    });

    it('should ask to not include movements if specified', async () => {
      await routesController.getGroups(false, authRequestMock);

      expect(spy).toBeCalledWith(userResponseMock(testUser).email, false);
    });
  });

  describe('getGroup()', () => {
    it('should ask controller for a group and return its response', async () => {
      const testGroup = muscleGroupsFixture[0];
      const spy = jest.spyOn(muscleGroupController, 'getMuscleGroup').mockResolvedValue(testGroup);

      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));

      const result = await routesController.getGroup(testGroup.id, authRequestMock);

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testGroup);
    });
  });

  describe('createGroup()', () => {
    it('should call controller to create a new group and return it', async () => {
      const testGroup = muscleGroupsFixture[1];

      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
      const spy = jest.spyOn(muscleGroupController, 'createGroup').mockResolvedValue(testGroup);

      const result = await routesController.createGroup(
        { ...testGroup, parent_group_id: undefined },
        authRequestMock,
      );

      expect(spy).toHaveBeenCalled();
      expect(result?.id).toBe(testGroup.id);
    });
  });
});
