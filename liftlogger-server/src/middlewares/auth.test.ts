import { usersFixture } from '../fixtures/UserFixtures';
import { authRequestMock, noAuthRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
import { AuthService } from '../services/AuthService';
import { authenticationMiddleware } from './auth';
import * as express from 'express';

describe('Auth Middleware', () => {
  describe('authenticationMiddleware', () => {
    const res = { send: jest.fn() } as unknown as express.Response;
    const next = jest.fn();

    const testUser = usersFixture[0];

    beforeEach(() => {
      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
    });

    it('should execute next function if authenticated', async () => {
      await authenticationMiddleware(authRequestMock, res, next);

      expect(next).toHaveBeenCalled();

      next.mockClear();
    });

    it('should send "Unauthorized" if not authenticated', async () => {
      await authenticationMiddleware(noAuthRequestMock, res, next);

      expect(res.send).toHaveBeenCalledWith('Unauthorized');

      next.mockClear();
    });
  });
});
