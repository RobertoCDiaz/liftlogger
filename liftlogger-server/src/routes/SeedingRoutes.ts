import * as express from 'express';
import { Get, Middlewares, Post, Request, Route } from 'tsoa';
import { authenticationMiddleware } from '../middlewares/auth';
import SeedingsController from '../controllers/SeedingsController';
import PrismaUtils from '../utils/PrismaUtils';

// actual references to real database
const prisma = PrismaUtils.getPrismaInstance();
const seedingController = new SeedingsController(prisma);

const prismaTest = PrismaUtils.getPrismaTestingInstance();
const testingSeedingController = new SeedingsController(prismaTest);

@Route('seeding')
export class SeedingRoutes {
  // TODO: Remove this temporal endpoint.
  @Get('')
  public async get() {
    return prisma.liftingSet.findMany({ include: { session: { select: { id: true } } } });
  }

  /**
   * Requests to add a set of default data to a User, such as defaul MuscleGroups, etc.
   *
   * @param req Request object
   */
  @Post('default')
  @Middlewares([authenticationMiddleware])
  public async seedDefaultData(@Request() req: express.Request) {
    seedingController.defaultUserSeeding(req.user_email);
  }

  /**
   * Requests to fill every table with fake records for a specific user.
   *
   * @param req Request object
   */
  @Post('fake')
  @Middlewares([authenticationMiddleware])
  public async seedFakeData(@Request() req: express.Request) {
    seedingController.seedFakeData(req.user_email);
  }

  /**
   * Fills the testing database with the data required for testing.
   */
  @Post('test')
  public async seedTestData() {
    testingSeedingController.seedTestData();
  }
}
