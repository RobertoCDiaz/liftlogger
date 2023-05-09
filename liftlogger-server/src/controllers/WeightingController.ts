import { PrismaClient, Weighting } from '@prisma/client';
import { WeightingCreationParams } from '../models/WeightingModel';

export class WeightingController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches all of the weighting registries from DB.
   *
   * @returns List of entries.
   */
  async getEntries(userEmail: string): Promise<Weighting[]> {
    return await this.prisma.weighting.findMany({
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
  async createEntry(data: WeightingCreationParams): Promise<Weighting> {
    const newEntry = await this.prisma.weighting.create({
      data: data,
    });

    return newEntry;
  }
}
