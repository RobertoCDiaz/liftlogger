import { Template } from '@prisma/client';
import PrismaUtils from '../utils/PrismaUtils';
import * as express from 'express';
import { Body, Controller, Delete, Get, Middlewares, Path, Post, Put, Request, Route } from 'tsoa';
import TemplateController from '../controllers/TemplateController';
import { authenticationMiddleware } from '../middlewares/auth';
import {
  TemplateCreationRequestParams,
  TemplateUpdateRequestParams,
} from '../models/TemplateModel';

@Route('templates')
export class TemplateRoutes extends Controller {
  templatesController = new TemplateController(PrismaUtils.getPrismaInstance());

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
    const templates = await this.templatesController.getTemplate(id, req.user_email);

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
    const templates = await this.templatesController.getTemplates(req.user_email);

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
    return await this.templatesController.create(
      { ...body.template, user_email: req.user_email },
      body.movements_ids,
    );
  }

  /**
   * Tries to update a template only if the user requesting owns it.
   *
   * @param id Template identifier
   * @param body Data to update the Template with.
   * @param req Request object
   * @returns Updated Template
   */
  @Put('{id}')
  @Middlewares([authenticationMiddleware])
  async updateTemplate(
    @Path() id: number,
    @Body() body: TemplateUpdateRequestParams,
    @Request() req: express.Request,
  ): Promise<Template | undefined> {
    const template = await this.templatesController.getTemplate(id, req.user_email);

    if (!template) {
      this.setStatus(404);
      return;
    }

    return await this.templatesController.updateTemplate(id, body.template, body.movements_ids);
  }

  /**
   * Tries to delete a template only if the user requesting owns it.
   *
   * @param id Template identifier
   * @param req Request object
   */
  @Delete('{id}')
  @Middlewares([authenticationMiddleware])
  async deleteTemplate(@Path() id: number, @Request() req: express.Request) {
    const userEmail = req.user_email;

    const deleted: boolean = await this.templatesController.deleteTemplate(id, userEmail);

    if (!deleted) {
      this.setStatus(404);
      return;
    }
  }
}
