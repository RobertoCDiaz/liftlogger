import { Template } from '@prisma/client';
import * as express from 'express';
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route } from 'tsoa';
import TemplateController from '../controllers/TemplateController';
import { authenticationMiddleware } from '../middlewares/auth';
import { TemplateCreationRequestParams } from '../models/TemplateModel';

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
  @Middlewares([authenticationMiddleware])
  async getTemplate(
    @Path() id: number,
    @Request() req: express.Request,
  ): Promise<Template | null | undefined> {
    const templates = TemplateController.getTemplate(id, req.user_email);

    return templates;
  }

  /**
   * Returns the list of templates owned by the current user.
   *
   * @param req Request object.
   * @returns List of templates.
   */
  @Get('')
  @Middlewares([authenticationMiddleware])
  async getTemplatesFromUser(
    @Request() req: express.Request,
  ): Promise<Template[] | null | undefined> {
    const templates = TemplateController.getTemplates(req.user_email);

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
  @Middlewares([authenticationMiddleware])
  async createTemplate(
    @Body() body: TemplateCreationRequestParams,
    @Request() req: express.Request,
  ): Promise<Template | null | undefined> {
    return TemplateController.create(
      { ...body.template, user_email: req.user_email },
      body.movements_ids,
    );
  }
}
