import { PrismaClient } from '@prisma/client';
import MovementNotesController from './MovementNotesController';
import PrismaUtils from '../utils/PrismaUtils';
import { MovementNoteCreationParams } from '../models/MovementNoteModel';
import { getMovementNotesFixture } from '../fixtures/MovementNotesFixture';

const prisma: PrismaClient = PrismaUtils.getPrismaTestingInstance();
const controller: MovementNotesController = new MovementNotesController(prisma);

describe('MovementNotesController', () => {
  afterEach(async () => {
    await prisma.movementNote.deleteMany({
      where: { id: { notIn: getMovementNotesFixture().map(n => n.id) } },
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('createNoteForMovement', () => {
    it('should properly create a new note', async () => {
      const testMovId = 2;
      const newNote: MovementNoteCreationParams = {
        notes: 'Just some testing notes',
        date: new Date('2023-06-22T21:13:11'),
      };
      const notesCount = await prisma.movementNote.count();

      const result = await controller.createNoteForMovement(newNote, testMovId);

      const newCount = await prisma.movementNote.count();

      expect(newCount).toBe(notesCount + 1);
      expect(result.notes).toBe(newNote.notes);
      expect(result.date).toEqual(newNote.date);
      expect(result.movement_id).toBe(testMovId);
    });
  });

  describe('getMovementNotes', () => {
    it('should get all notes if no period is provided', async () => {
      let result = await controller.getMovementNotes(1);
      expect(result).toHaveLength(6);

      result = await controller.getMovementNotes(2);
      expect(result).toHaveLength(4);

      result = await controller.getMovementNotes(7);
      expect(result).toHaveLength(0);
    });

    it('should properly get notes from specified period', async () => {
      let result = await controller.getMovementNotes(
        1,
        new Date('2023-03-01'),
        new Date('2023-03-31'),
      );
      expect(result).toHaveLength(3);

      result = await controller.getMovementNotes(1, new Date('2023-03-17'));
      expect(result).toHaveLength(2);

      result = await controller.getMovementNotes(1, undefined, new Date('2023-02-18T23:59:59'));
      expect(result).toHaveLength(2);
    });
  });
});
