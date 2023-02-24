import { PrismaClient, Weighting } from '@prisma/client';
import { WeightingModel } from '../models/Weighting';

const prisma = new PrismaClient();

export class WeightingController {
  static async addEntry(data: WeightingModel): Promise<Weighting> {

    const newEntry = await prisma.weighting.create({
      data: data
    });

    return newEntry;
  }

  static async addEntriesMassively(data: []) {

  }
}
