import * as express from 'express';
import { Weighting } from '@prisma/client';
import { Body, Controller, Get, Middlewares, Post, Request, Route } from 'tsoa';
import { WeightingController } from '../controllers/WeightingController';
import { shouldBeAuthenticated } from '../middlewares/auth';
import { WeightingCreationParams, WeightingCreationRequestParams } from '../models/WeightingModel';
import { ModelRequestParams } from '../utils/ModelRequestParams';
import { AuthService } from '../services/AuthService';

@Route('weightings')
export class WeightingRoutes extends Controller {
  /**
   * Gets all the weightings from DB.
   *
   * @param req Request object
   * @returns All the content from the Weightings DB table
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  public async getWeightings(
    @Request() req: express.Request,
  ): Promise<Weighting[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return WeightingController.getEntries(email);
  }

  /**
   * Creates a new entry on the Weighting DB table.
   *
   * @param weightingData Data to be inserted
   * @param req Request object
   * @returns Created row
   */
  @Post()
  @Middlewares([shouldBeAuthenticated])
  public async createWeighting(
    @Body() weightingData: WeightingCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Weighting | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const newEntry = await WeightingController.createEntry({
      ...weightingData,
      user_email: email,
      datetime: weightingData.datetime ?? new Date(),
    });

    return newEntry;
  }
}
