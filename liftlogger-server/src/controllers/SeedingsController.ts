import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { liftingSessionsFixture } from '../fixtures/LiftingSessionFixtures';
import { liftingSetsFixture } from '../fixtures/LiftingSetFixtures';
import { groupsForMovementsFixture, movementsFixture } from '../fixtures/MovementFixtures';
import { muscleGroupsFixture } from '../fixtures/MuscleGroupFixtures';
import { usersFixture } from '../fixtures/UserFixtures';
import { MuscleGroupCreationParams } from '../models/MuscleGroupModel';
import MovementNotesController from './MovementNotesController';
import MovementsController from './MovementsController';
import TemplateController from './TemplateController';

export default class SeedingsController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Adds a set of default data to a User, such as defaul MuscleGroups, etc.
   *
   * @param userEmail User to add groups to
   */
  defaultUserSeeding(userEmail: string) {
    const muscleGroups: MuscleGroupCreationParams[] = muscleGroupsFixture.map(fixture => ({
      name: fixture.name,
      description: fixture.description,
      user_email: userEmail,
    }));

    this.prisma.muscleGroup.createMany({ data: muscleGroups });
  }

  /**
   * Inserts into DB a fixed set of testing data, found in the fixtures files for each table.
   *
   * @param userEmail User email
   */
  async seedTestData() {
    const userCount = await this.prisma.user.count();

    if (userCount > 0) {
      console.log('preventing seeding: db already seeded' + userCount);
      return;
    }

    this.prisma
      .$transaction([
        // insert test users
        this.prisma.user.createMany({ data: usersFixture }),
        // insert test musclegroups
        this.prisma.muscleGroup.createMany({ data: muscleGroupsFixture }),
        // insert test movements along with their musclegroups relations
        ...movementsFixture.map(movement =>
          this.prisma.movement.create({
            data: {
              ...movement,
              groups: {
                connect: groupsForMovementsFixture[movement.id],
              },
            },
          }),
        ),
        // insert test sessions and sets
        this.prisma.liftingSession.createMany({ data: liftingSessionsFixture }),
        this.prisma.liftingSet.createMany({ data: liftingSetsFixture }),
      ])
      .then(() => {
        console.log('testing data was successfully seeded');
      })
      .catch(err => {
        console.log(err);
      });
  }

  /**
   * Fills every table with fake records for a specific user.
   *
   * @param userEmail User to fill with fake date
   */
  async seedFakeData(userEmail: string) {
    // const userGroups = await MuscleGroupController.getAll(userEmail);
    const userGroups = await this.prisma.muscleGroup.findMany({ where: { user_email: userEmail } });

    const groupsIds: number[] = userGroups.map(group => group.id);

    // movements
    new Array(25).fill(0).forEach(async m => {
      await new MovementsController(this.prisma).createMovement(
        {
          name: faker.name.jobTitle(),
          description: faker.lorem.words(10),
          user_email: userEmail,
        },
        faker.helpers.arrayElements(groupsIds).map((groupId, index) => ({
          group_id: groupId,
          is_primary: index === 0,
        })),
      );
    });

    const movements = await new MovementsController(this.prisma).getMovementsFromUser(userEmail);
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

    // templates
    const templates: number[] = new Array(10).fill(0);
    templates.forEach(async t => {
      await TemplateController.create(
        {
          name: faker.name.jobType(),
          user_email: userEmail,
        },
        movementsIds,
      );
    });

    // weightings
    await this.prisma.weighting.createMany({
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
        user_email: userEmail,
      })),
    });

    // lifting sessions
    new Array(500).fill(0).forEach(async ls => {
      const startTime: Date = faker.date.recent(30 * 24);
      // const endTime: Date = { ...startTime };

      const sets = new Array(faker.datatype.number({ max: 15, min: 5 })).fill(0);

      await this.prisma.liftingSession.create({
        data: {
          start_time: startTime,
          end_time: startTime,
          notes: faker.lorem.paragraph(),
          user_email: userEmail,
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
  }
}
