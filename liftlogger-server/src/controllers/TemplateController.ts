import { PrismaClient, Template } from '@prisma/client';
import { TemplateCreationParams, TemplateUpdateParams } from '../models/TemplateModel';

export default class TemplateController {
  constructor(private prisma: PrismaClient) {}

  /**
   * Fetches a single template of a user from DB.
   * It also includes the template's movements.
   *
   * @param templateId Id of the template
   * @param userEmail User email to match it against
   * @returns Fetched template, or nothing if no match was found
   */
  async getTemplate(templateId: number, userEmail: string): Promise<Template | null> {
    const templates = await this.prisma.template.findFirst({
      where: {
        id: templateId,
        user_email: userEmail,
      },
      include: {
        movements: true,
      },
    });

    return templates;
  }

  /**
   * Fetches the Templates table in search of the user's templates.
   * It also includes the templates' movements and the MuscleGroups they belong to.
   *
   * @param userEmail Email of the user whose templates are to be fetched.
   * @returns List of the user's templates.
   */
  async getTemplates(userEmail: string): Promise<Template[]> {
    const templates = await this.prisma.template.findMany({
      where: {
        user_email: userEmail,
      },
      include: {
        movements: {
          include: {
            groups: true,
          },
        },
      },
    });

    return templates;
  }

  /**
   * Inserts a new template in DB. It also makes the proper relationship to
   * add movements to that new template if a list of Movement ids is provided.
   *
   * @param template Data for the template to be created.
   * @param movementsIds List of the Movements' ids to be included in the template.
   * @returns Template created.
   */
  async create(template: TemplateCreationParams, movementsIds?: number[]): Promise<Template> {
    const newTemplate = await this.prisma.template.create({
      data: {
        ...template,
        movements: movementsIds && {
          connect: movementsIds.map(id => ({ id: id })),
        },
      },
    });

    return newTemplate;
  }

  /**
   * Updates the information of Template.
   *
   * @param id Identifier for the Template to be modified
   * @param newTemplateData New data for the Template
   * @param newMovementsIds New set of Movements identifier to be a part of the template. If not provided, they will not be modified
   * @returns Updated record
   */
  async updateTemplate(
    id: number,
    newTemplateData: TemplateUpdateParams,
    newMovementsIds?: number[],
  ): Promise<Template> {
    if (newMovementsIds) {
      // get current movements ids as list
      const oldMovementsIds: number[] = (
        await this.prisma.movement.findMany({
          select: { id: true },
          where: { templates: { some: { id } } },
        })
      ).map(currTemplate => currTemplate.id);

      // delete relationship between template and its movements
      await this.prisma.template.update({
        where: { id },
        data: {
          movements: {
            disconnect: oldMovementsIds.map(id => ({ id })),
          },
        },
      });

      // create relationships between template and new movements
      await this.prisma.template.update({
        where: { id },
        data: { movements: { connect: newMovementsIds.map(id => ({ id })) } },
      });
    }

    const updated = await this.prisma.template.update({
      where: { id },
      data: newTemplateData,
    });

    return updated;
  }
}
