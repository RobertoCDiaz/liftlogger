import { LiftingSession } from '@prisma/client';
import LiftingSessionController from '../controllers/LiftingSessionsController';
import { liftingSessionsFixture } from '../fixtures/LiftingSessionFixtures';
import { emailRequestMock } from '../mocks/request.mock';
import { LiftingSessionsRoutes } from './LiftingSessionsRoutes';
import { LiftingSessionWithSetsCreationRequestParams } from '../models/LiftingSessionModel';

describe('LiftingSessionRoutes', () => {
  let controller: LiftingSessionsRoutes;

  let liftingSessionsController: LiftingSessionController;

  beforeEach(() => {
    controller = new LiftingSessionsRoutes();

    liftingSessionsController = controller.liftingSessionsController;
  });

  describe('getSession()', () => {
    it('should call controller to get result with sets by default', async () => {
      const mockId: number = 23;
      const mockSession = liftingSessionsFixture[0];
      const spy = jest
        .spyOn(liftingSessionsController, 'getLiftingSession')
        .mockResolvedValue(mockSession);

      const result = await controller.getSession(mockId, undefined, emailRequestMock);

      expect(result).toEqual(mockSession);
      expect(spy).toBeCalledWith(mockId, emailRequestMock.user_email, true);
    });

    it('should call controller to get result without sets if specified', async () => {
      const mockId: number = 23;
      const mockSession = liftingSessionsFixture[0];
      const spy = jest
        .spyOn(liftingSessionsController, 'getLiftingSession')
        .mockResolvedValue(mockSession);

      const result = await controller.getSession(mockId, false, emailRequestMock);

      expect(result).toEqual(mockSession);
      expect(spy).toBeCalledWith(mockId, emailRequestMock.user_email, false);
    });

    it('should return undefined and 404 if no session found', async () => {
      const mockId: number = 23;
      const spy = jest.spyOn(controller, 'setStatus');
      jest.spyOn(liftingSessionsController, 'getLiftingSession').mockResolvedValue(null);

      const result = await controller.getSession(mockId, false, emailRequestMock);

      expect(result).toBeUndefined();
      expect(spy).toBeCalledWith(404);
    });
  });

  describe('getSessions()', () => {
    it('should get the result with sets by default from controller', async () => {
      const mockSessions = liftingSessionsFixture;
      const spy = jest
        .spyOn(liftingSessionsController, 'getLiftingSessionsFromUser')
        .mockResolvedValue(mockSessions);

      const result = await controller.getSessions(undefined, emailRequestMock);

      expect(result).toEqual(mockSessions);
      expect(spy).toBeCalledWith(emailRequestMock.user_email, true);
    });

    it('should get the result with no sets if specified', async () => {
      const mockSessions: LiftingSession[] = [];
      const spy = jest
        .spyOn(liftingSessionsController, 'getLiftingSessionsFromUser')
        .mockResolvedValue(mockSessions);

      const result = await controller.getSessions(false, emailRequestMock);

      expect(result).toEqual(mockSessions);
      expect(spy).toBeCalledWith(emailRequestMock.user_email, false);
    });
  });

  describe('createSession()', () => {
    it('should call controller to create a new session using provided params', async () => {
      const resultMock: LiftingSession = liftingSessionsFixture[0];
      const bodyMock: LiftingSessionWithSetsCreationRequestParams = {
        session: {
          notes: 'Just a fake session',
          start_time: new Date('2023-07-05T14:09:22'),
          end_time: new Date('2023-07-05T15:16:10'),
        },
        sets: [
          { movement_id: 3, reps: 16, weight: 10.5, notes: 'Some notes' },
          { movement_id: 3, reps: 15, weight: 10.5 },
          { movement_id: 3, reps: 13, weight: 10.5 },
        ],
      };
      const spy = jest
        .spyOn(liftingSessionsController, 'createSessionWithSets')
        .mockResolvedValue(resultMock);

      const result = await controller.createSession(bodyMock, emailRequestMock);

      expect(result).toEqual(resultMock);
      expect(spy).toBeCalledWith(
        { ...bodyMock.session, user_email: emailRequestMock.user_email },
        bodyMock.sets,
      );
    });
  });
});
