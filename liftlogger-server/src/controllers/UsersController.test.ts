import { User } from '@prisma/client';
import { usersFixture } from '../fixtures/UserFixtures';
import PrismaUtils from '../utils/PrismaUtils';
import UserController from './UsersController';

const prisma = PrismaUtils.getPrismaTestingInstance();
const controller = new UserController(prisma);

describe('UsersController', () => {
  describe('get()', () => {
    afterAll(() => {
      prisma.$disconnect();
    });

    it('should return the correct user given an email', async () => {
      const expectedUser = usersFixture[0];
      const result = await controller.get(expectedUser.email);

      expect(result).toEqual(expectedUser);
    });
    it('should return null if no user was found', async () => {
      const result = await controller.get('not-an-email@test.com');

      expect(result).toBeFalsy();
    });
  });
  describe('create()', () => {
    it('should create a new user in DB', async () => {
      const testUser: User = { email: 'new-user@test.com' };

      const result = await controller.create(testUser);

      expect(result).toEqual(testUser);

      await prisma.user.delete({ where: { email: testUser.email } });
    });
  });
});