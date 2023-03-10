import { Template } from '@prisma/client';
import * as express from 'express';
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route } from "tsoa";
import TemplateController from '../controllers/TemplateController';
import { shouldBeAuthenticated } from "../middlewares/auth";
import { TemplateCreationRequestParams } from '../models/TemplateModel';
import { AuthService } from '../services/AuthService';

@Route('templates')
export class TemplateRoutes extends Controller {
  /**
   * Returns a template, making sure it is owned by the current user.
   *
   * @param id ID of the template.
   * @param req Request object.
   * @returns Fetched template, or nothing if not found.
   */
  @Get('{id}')
  @Middlewares([shouldBeAuthenticated])
  async getTemplate(
    @Path() id: number,
    @Request() req: express.Request
  ): Promise<Template | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const templates = TemplateController.getTemplate(id, email);

    return templates;
  }

  /**
   * Returns the list of templates owned by the current user.
   *
   * @param req Request object.
   * @returns List of templates.
   */
  @Get('')
  @Middlewares([shouldBeAuthenticated])
  async getTemplatesFromUser(
    @Request() req: express.Request
  ): Promise<Template[] | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    const templates = TemplateController.getTemplates(email);

    return templates;
  }

  /**
   * Creates a new template for the current user, and adds movements to it.
   *
   * @param body Contains the data to create the template, along with the movements that it will contain.
   * @param req Request object.
   * @returns Created template, if successful.
   */
  @Post('')
  @Middlewares([shouldBeAuthenticated])
  async createTemplate(
    @Body() body: TemplateCreationRequestParams,
    @Request() req: express.Request
  ): Promise<Template | null | undefined> {
    if (!req.auth) {
      return;
    }

    const { email } = await AuthService.getUserInfo(req.auth.token);

    return TemplateController.create({ ...body.template, user_email: email }, body.movements_ids);
  }
}
