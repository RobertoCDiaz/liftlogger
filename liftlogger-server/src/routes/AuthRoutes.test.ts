import { User } from '@prisma/client';
import UserController from '../controllers/UsersController';
import { AuthRoutes } from './AuthRoutes';
import { getUsersFixture } from '../fixtures/UserFixtures';

describe('AuthRoutes', () => {
  let routesController: AuthRoutes;

  let userController: UserController;

  const testUser: User = getUsersFixture()[0];

  beforeEach(() => {
    routesController = new AuthRoutes();

    userController = routesController.userController;
  });

  describe('createUser()', () => {
    it('should return true and create user if not created yet', async () => {
      const createSpy = jest.spyOn(userController, 'create').mockResolvedValue(testUser);
      jest.spyOn(userController, 'get').mockResolvedValue(null);

      const result = await routesController.createUser(testUser);

      expect(createSpy).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should return false and not create user if already in db', async () => {
      const createSpy = jest.spyOn(userController, 'create');
      jest.spyOn(userController, 'get').mockResolvedValue(testUser);

      const result = await routesController.createUser(testUser);

      expect(createSpy).not.toHaveBeenCalled();
      expect(result).toBe(false);
    });
  });
});
