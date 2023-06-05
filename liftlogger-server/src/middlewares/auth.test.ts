import { getUsersFixture } from '../fixtures/UserFixtures';
import { authRequestMock, noAuthRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
import { AuthService } from '../services/AuthService';
import { authenticationMiddleware } from './auth';
import * as express from 'express';

describe('Auth Middleware', () => {
  describe('authenticationMiddleware', () => {
    let req: express.Request;
    let res: express.Response;
    const next = jest.fn();

    const testUser = getUsersFixture()[0];

    beforeEach(() => {
      req = authRequestMock();
      res = { send: jest.fn() } as unknown as express.Response;
    });

    afterEach(() => {
      next.mockClear();
    });

    beforeEach(() => {
      jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
    });

    it('should execute next function if authenticated', async () => {
      await authenticationMiddleware(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it('should add `user_email` property to request', async () => {
      expect(req.user_email).toBeFalsy();

      await authenticationMiddleware(req, res, next);

      expect(req.user_email).toBeTruthy();
    });

    it('should send "Unauthorized" if not authenticated', async () => {
      await authenticationMiddleware(noAuthRequestMock, res, next);

      expect(res.send).toHaveBeenCalledWith('Unauthorized');
    });
  });
});
