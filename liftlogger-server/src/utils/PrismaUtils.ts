import { PrismaClient } from '@prisma/client';

export default class PrismaUtils {
  /**
   * Singleton PrismaClient instance for real database.
   */
  private static realPrismaInstance: PrismaClient;

  /**
   * Returns a singleton-like instance of Prisma Client for the real database.
   *
   * @returns Prisma instance for real database
   */
  static getPrismaInstance(): PrismaClient {
    if (!this.realPrismaInstance) {
      this.realPrismaInstance = new PrismaClient();
    }

    return this.realPrismaInstance;
  }

  /**
   * Creates a new PrismaClient instance using the testing database.
   *
   * @returns Prisma instance for the testing database
   */
  static getPrismaTestingInstance(): PrismaClient {
    return new PrismaClient({
      datasources: {
        db: {
          // make sure to use testing database
          url: process.env.DB_URL?.endsWith('_test')
            ? process.env.DB_URL
            : process.env.DB_URL + '_test',
        },
      },
    });
  }
}
