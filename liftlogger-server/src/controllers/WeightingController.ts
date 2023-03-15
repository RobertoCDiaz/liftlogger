import { PrismaClient, Weighting } from '@prisma/client';
import { WeightingCreationParams } from '../models/WeightingModel';

const prisma = new PrismaClient();

export class WeightingController {
  /**
   * Fetches all of the weighting registries from DB.
   *
   * @returns List of entries.
   */
  static async getEntries(userEmail: string): Promise<Weighting[]> {
    return await prisma.weighting.findMany({
      where: {
        user_email: userEmail,
      },
    });
  }

  /**
   * Creates a new Weighting entry.
   *
   * @param data New Weighting data to be inserted.
   * @returns Data inserted, fetched directly from DB.
   */
  static async createEntry(data: WeightingCreationParams): Promise<Weighting> {
    const newEntry = await prisma.weighting.create({
      data: data
    });

    return newEntry;
  }
}
