import { PrismaClient, Weighting } from '@prisma/client';
import { WeightingCreationParams } from '../models/WeightingModel';

const prisma = new PrismaClient();

export class WeightingController {
  /**
   * Fetches all of the weighting registries from DB.
   *
   * @returns List of entries.
   */
  static async getEntries(): Promise<Weighting[]> {
    return await prisma.weighting.findMany();
  }

  /**
   * Creates a new Weighting entry.
   *
   * @param data New Weighting data to be inserted.
   * @returns Data inserted, fetched directly from DB.
   */
  static async createEntry(data: WeightingCreationParams): Promise<Weighting> {
    // TODO: Create a logger class.
    console.log('🔵 Inserting new Weighting...');
    console.log(data);

    if (!data.datetime) {
      data.datetime = new Date();
    }

    const newEntry = await prisma.weighting.create({
      data: data
    });

    return newEntry;
  }
}
