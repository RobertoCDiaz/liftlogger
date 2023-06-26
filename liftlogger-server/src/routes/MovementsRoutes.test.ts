import MovementNotesController from '../controllers/MovementNotesController';
import MovementsController from '../controllers/MovementsController';
import { getMovementsFixture } from '../fixtures/MovementFixtures';
import { getUsersFixture } from '../fixtures/UserFixtures';
import { emailRequestMock } from '../mocks/request.mock';
import { MovementCreationRequestParams } from '../models/MovementModel';
import { MovementRoutes } from './MovementsRoutes';

describe('MovementRoutes', () => {
  let routesController: MovementRoutes;

  let movementsController: MovementsController;
  let notesController: MovementNotesController;

  const testUser = getUsersFixture()[0];
  const testMovements = getMovementsFixture().filter(m => m.user_email === testUser.email);

  beforeEach(() => {
    routesController = new MovementRoutes();

    movementsController = routesController.movementsController;
    notesController = routesController.notesController;
  });

  describe('getMovement()', () => {
    it('should ask controller for a movement with a given id', async () => {
      const testMovement = testMovements[0];
      const spy = jest.spyOn(movementsController, 'getMovement').mockResolvedValue(testMovement);

      const result = await routesController.getMovement(testMovement.id, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email);
      expect(result).toEqual(testMovement);
    });

    it('should return undefined and 404 if not movement found', async () => {
      const spy = jest.spyOn(movementsController, 'getMovement').mockResolvedValue(null);

      const result = await routesController.getMovement(451, emailRequestMock);

      expect(routesController.getStatus()).toBe(404);
      expect(result).toBeUndefined();
    });
  });

  describe('getUserMovements()', () => {
    it('should ask for all the movements of a user', async () => {
      const spy = jest
        .spyOn(movementsController, 'getMovementsFromUser')
        .mockResolvedValue(testMovements);

      const result = await routesController.getUserMovements(emailRequestMock);

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

      const result = await routesController.createMovement(testInput, emailRequestMock);

      expect(spy).toHaveBeenCalled();
      expect(result).toEqual(testMovement);
    });
  });

  describe('getMovementNotes()', () => {
    it('should call notes controller and ask for the notes of a movement', async () => {
      const testMovement = testMovements[0];
      const spy = jest.spyOn(notesController, 'getMovementNotes').mockResolvedValue([]);

      jest.spyOn(movementsController, 'getMovement').mockResolvedValue(testMovement);

      await routesController.getMovementNotes(testMovement.id, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, undefined, undefined);
    });

    it('should properly pass period arguments to controller call', async () => {
      const testMovement = testMovements[0];
      const testFrom = '2023-01-01';
      const testTo = '2023-05-31';
      const testFromDate = new Date(testFrom);
      const testToDate = new Date(testTo);
      const spy = jest.spyOn(notesController, 'getMovementNotes').mockResolvedValue([]);

      jest.spyOn(movementsController, 'getMovement').mockResolvedValue(testMovement);

      await routesController.getMovementNotes(testMovement.id, emailRequestMock, testFrom, testTo);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testFromDate, testToDate);
    });
  });

  describe('getMovementJournal()', () => {
    const testMovement = testMovements[0];

    it("should ask controller for a movement's journal", async () => {
      const spy = jest.spyOn(movementsController, 'getMovementJournal').mockResolvedValue([]);

      await routesController.getMovementJournal(testMovement.id, undefined, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email, false);
    });

    it("should ask for a movement's journal with the more recent entries first if specified", async () => {
      const spy = jest.spyOn(movementsController, 'getMovementJournal').mockResolvedValue([]);

      await routesController.getMovementJournal(testMovement.id, true, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(testMovement.id, testUser.email, true);
    });
  });
});
