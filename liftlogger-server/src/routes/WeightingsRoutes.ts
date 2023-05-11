import * as express from 'express';
import { Weighting } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa';
import { WeightingController } from '../controllers/WeightingController';
import { authenticationMiddleware } from '../middlewares/auth';
import { WeightingCreationRequestParams } from '../models/WeightingModel';
import PrismaUtils from '../utils/PrismaUtils';

@Route('weightings')
export class WeightingRoutes extends Controller {
  weightingController = new WeightingController(PrismaUtils.getPrismaInstance());

  /**
   * Gets all the weightings from DB.
   *
   * @param req Request object
   * @returns All the content from the Weightings DB table
   */
  @Get('')
  @Middlewares([authenticationMiddleware])
  public async getWeightings(
    @Request() req: express.Request,
  ): Promise<Weighting[] | null | undefined> {
    return await this.weightingController.getEntries(req.user_email);
  }

  /**
   * Creates a new entry on the Weighting DB table.
   *
   * @param weightingData Data to be inserted
   * @param req Request object
   * @returns Created row
   */
  @Post()
  @Middlewares([authenticationMiddleware])
  public async createWeighting(
    @Body() weightingData: WeightingCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Weighting | null | undefined> {
    const newEntry = await this.weightingController.createEntry({
      ...weightingData,
      user_email: req.user_email,
      datetime: weightingData.datetime ?? new Date(),
    });

    return newEntry;
  }
}
