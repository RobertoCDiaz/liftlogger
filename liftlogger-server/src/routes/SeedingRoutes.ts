// TODO: Improve temporal seeding routes: create controller
import * as express from 'express';
import { PrismaClient } from '@prisma/client';
import { Middlewares, Post, Request, Route } from 'tsoa';
import { shouldBeAuthenticated } from '../middlewares/auth';
import { faker } from '@faker-js/faker';
import { AuthService } from '../services/AuthService';
import MuscleGroupController from '../controllers/MuscleGroupsController';
import MovementsController from '../controllers/MovementsController';
import TemplateController from '../controllers/TemplateController';
import MovementNotesController from '../controllers/MovementNotesController';

const prisma = new PrismaClient();

@Route('seeding')
export class SeedingRoutes {
  @Post('default')
  @Middlewares([shouldBeAuthenticated])
  public async seedDefaultData(@Request() req: express.Request) {
    if (!req.auth) {
      return;
    }

    console.log('seeding default...');

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const muscleGroups: string[] = ['Chest', 'Back', 'Legs', 'Arms'];

    await prisma.muscleGroup.createMany({
      data: muscleGroups.map(groupName => ({
        name: groupName,
        description: faker.lorem.words(12), // TODO: add real description to musclegroups
        user_email: email,
      })),
    });
  }

  @Post('test')
  @Middlewares([shouldBeAuthenticated])
  public async seedTestingData(@Request() req: express.Request) {
    if (!req.auth) {
      return;
    }

    console.log('seeding test...');

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const userGroups = await MuscleGroupController.getAll(email);
    const groupsIds: number[] = userGroups.map(group => group.id);

    // movements
    new Array(25).fill(0).forEach(async m => {
      await MovementsController.createMovement(
        {
          name: faker.name.jobTitle(),
          description: faker.lorem.words(10),
          user_email: email,
        },
        faker.helpers.arrayElements(groupsIds).map((groupId, index) => ({
          group_id: groupId,
          is_primary: index === 0,
        })),
      );
    });

    console.log('seeded movements');

    const movements = await MovementsController.getMovementsFromUser(email);
    const movementsIds = faker.helpers.arrayElements(movements?.map(movement => movement.id));

    // movementNotes
    new Array(50).fill(0).forEach(mn => {
      MovementNotesController.createNoteForMovement(
        {
          date: faker.date.recent(60),
          notes: faker.lorem.words(30),
        },
        faker.helpers.arrayElement(movementsIds),
      );
    });

    console.log('seeded movementsnotes');

    // templates
    const templates: number[] = new Array(10).fill(0);
    templates.forEach(async t => {
      await TemplateController.create(
        {
          name: faker.name.jobType(),
          user_email: email,
        },
        movementsIds,
      );
    });

    console.log('seeded templates');

    // weightings
    await prisma.weighting.createMany({
      data: new Array(50).fill(0).map(e => ({
        // datetime: Math.round(faker.date.recent(80).getTime() / 1000),
        datetime: faker.date.recent(80),
        fat_percentage: faker.datatype.float({ max: 23, min: 21.5 }),
        muscle_mass: faker.datatype.float({ max: 52, min: 50 }),
        weight: faker.datatype.float({ max: 75, min: 50 }),
        metabolism: faker.datatype.float({ max: 1600, min: 1550 }),
        water_percentage: faker.datatype.float({ max: 55, min: 50 }),
        protein_percentage: faker.datatype.float({ max: 19.5, min: 18 }),
        visceral_fat: faker.datatype.float({ max: 9.5, min: 8 }),
        user_email: email,
      })),
    });

    console.log('seeded weightings');

    // lifting sessions
    new Array(500).fill(0).forEach(async ls => {
      const startTime: Date = faker.date.recent(30 * 24);
      // const endTime: Date = { ...startTime };

      const sets = new Array(faker.datatype.number({ max: 15, min: 5 })).fill(0);

      await prisma.liftingSession.create({
        data: {
          start_time: startTime,
          end_time: startTime,
          notes: faker.lorem.paragraph(),
          user_email: email,
          sets: {
            createMany: {
              data: sets.map(s => ({
                movement_id: faker.helpers.arrayElement(movements ?? []).id,
                reps: faker.datatype.number({ max: 20, min: 7 }),
                weight: faker.datatype.number({ max: 50, min: 10 }),
              })),
            },
          },
        },
      });
    });

    console.log('seeded lifting sessions');
  }
}
