import { Weighting } from "@prisma/client";
import { Body, Controller, Get, Post, Route } from "tsoa";
import { WeightingController } from "../controllers/WeightingController";
import { WeightingCreationParams } from "../models/WeightingModel";

@Route('weightings')
export class WeightingRoutes extends Controller {
  /**
   * Gets all the weightings from DB.
   *
   * @returns All the content from the Weightings DB table.
   */
  @Get('')
  public async getWeightings(): Promise<Weighting[]> {
    // TODO: Make it user agnostic.
    return WeightingController.getEntries();
  }

  /**
   * Creates a new entry on the Weighting DB table.
   *
   * @param weightingData Data to be inserted.
   * @returns Created row.
   */
  @Post()
  public async createWeighting(
    @Body() weightingData: WeightingCreationParams
  ): Promise<Weighting> {
    const newEntry = await WeightingController.createEntry(weightingData);

    return newEntry;
  }
}
