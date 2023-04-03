import * as express from 'express';
import { Get, Middlewares, Post, Request, Route } from 'tsoa';
import { shouldBeAuthenticated } from '../middlewares/auth';
import { AuthService } from '../services/AuthService';
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
  @Middlewares([shouldBeAuthenticated])
  public async seedDefaultData(@Request() req: express.Request) {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    seedingController.defaultUserSeeding(email);
  }

  /**
   * Requests to fill every table with fake records for a specific user.
   *
   * @param req Request object
   */
  @Post('fake')
  @Middlewares([shouldBeAuthenticated])
  public async seedFakeData(@Request() req: express.Request) {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    seedingController.seedFakeData(email);
  }

  /**
   * Fills the testing database with the data required for testing.
   */
  @Post('test')
  public async seedTestData() {
    testingSeedingController.seedTestData();
  }
}
