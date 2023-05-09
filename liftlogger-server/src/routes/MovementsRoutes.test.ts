import MovementNotesController from '../controllers/MovementNotesController';
import MovementsController from '../controllers/MovementsController';
import { movementsFixture } from '../fixtures/MovementFixtures';
import { usersFixture } from '../fixtures/UserFixtures';
import { authRequestMock } from '../mocks/request.mock';
import { userResponseMock } from '../mocks/userinfo.mock';
import { MovementCreationRequestParams } from '../models/MovementModel';
import { AuthService } from '../services/AuthService';
import { MovementRoutes } from './MovementsRoutes';

describe('MovementRoutes', () => {
  let routesController: MovementRoutes;

  let movementsController: MovementsController;
  let notesController: MovementNotesController;

  const testUser = usersFixture[0];
  const testMovements = movementsFixture.filter(m => m.user_email === testUser.email);

  beforeEach(() => {
    routesController = new MovementRoutes();

    movementsController = routesController.movementsController;
    notesController = routesController.notesController;

    jest.spyOn(AuthService, 'getUserInfo').mockResolvedValue(userResponseMock(testUser));
  });

  describe('getMovement()', () => {
    it('should ask controller for a movement with a given id', async () => {
      const testMovement = testMovements[0];
      const spy = jest.spyOn(movementsController, 'getMovement').mockResolvedValue(testMovement);

      const result = await routesController.getMovement(testMovement.id, authRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email);
      expect(result).toEqual(testMovement);
    });
  });

  describe('getUserMovements()', () => {
    it('should ask for all the movements of a user', async () => {
      const spy = jest
        .spyOn(movementsController, 'getMovementsFromUser')
        .mockResolvedValue(testMovements);

      const result = await routesController.getUserMovements(authRequestMock);

      expect(spy).toBeCalledWith(testUser.email);
      expect(result).toEqual(testMovements);
    });
  });

  describe('createMovement()', () => {
    it('should call controller to create a new movement', async () => {
      const testMovement = testMovements[0];
      const testInput: MovementCreationRequestParams = {
        movement: {
          name: testMovement.name,
          description: testMovement.description ?? undefined,
          primary_group_id: 1,
        },
        muscleGroups: [
          { group_id: 1, is_primary: true },
          { group_id: 3, is_primary: true },
        ],
      };
      const spy = jest.spyOn(movementsController, 'createMovement').mockResolvedValue(testMovement);

      const result = await routesController.createMovement(testInput, authRequestMock);

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testMovement);
    });
  });

  describe('getMovementNotes()', () => {
    it('should call notes controller and ask for the notes of a movement', async () => {
      const testMovement = testMovements[0];
      const spy = jest.spyOn(notesController, 'getMovementNotes').mockResolvedValue([]);

      jest.spyOn(movementsController, 'getMovement').mockResolvedValue(testMovement);

      await routesController.getMovementNotes(testMovement.id, authRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id);
    });
  });

  describe('getMovementJournal()', () => {
    const testMovement = testMovements[0];

    it("should ask controller for a movement's journal", async () => {
      const spy = jest.spyOn(movementsController, 'getMovementJournal').mockResolvedValue([]);

      await routesController.getMovementJournal(testMovement.id, undefined, authRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email, false);
    });

    it("should ask for a movement's journal with the more recent entries first if specified", async () => {
      const spy = jest.spyOn(movementsController, 'getMovementJournal').mockResolvedValue([]);

      await routesController.getMovementJournal(testMovement.id, true, authRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email, true);
    });
  });
});
