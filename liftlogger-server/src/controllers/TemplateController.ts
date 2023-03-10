import { PrismaClient, Template } from "@prisma/client";
import { TemplateCreationParams } from "../models/TemplateModel";

const prisma = new PrismaClient();

export default class TemplateController {
  /**
   * Fetches a single template of a user from DB.
   * It also includes the template's movements.
   *
   * @param templateId Id of the template
   * @param userEmail User email to match it against
   * @returns Fetched template, or nothing if no match was found
   */
  static async getTemplate(templateId: number, userEmail: string): Promise<Template | null | undefined> {
    const templates = await prisma.template.findFirst({
      where: {
        id: templateId,
        user_email: userEmail,
      },
      include: {
        movement_templates: {
          select: {
            movement: true,
          },
        },
      },
    });

    return templates;
  }

  /**
   * Fetches the Templates table in search of the user's templates.
   * It also includes the templates' movements.
   *
   * @param userEmail Email of the user whose templates are to be fetched.
   * @returns List of the user's templates.
   */
  static async getTemplates(userEmail: string): Promise<Template[] | null | undefined> {
    const templates = await prisma.template.findMany({
      where: {
        user_email: userEmail,
      },
      include: {
        movement_templates: {
          select: {
            movement: true,
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
  static async create(template: TemplateCreationParams, movementsIds?: number[]) {
    const newTemplate = await prisma.template.create({ data: template });

    if (movementsIds) {
      await this.addMovementsToTemplate(newTemplate.id, movementsIds, newTemplate.user_email);
    }

    return newTemplate;
  }

  /**
   * Add movements to a template.
   *
   * @param templateId Template in which the movements will be inserted to.
   * @param movementsIds Ids of the movements to be inserted.
   * @param userEmail Owner of the template/movements.
   * @returns Number of movements inserted into the template.
   */
  static async addMovementsToTemplate(templateId: number, movementsIds: number[], userEmail: string): Promise<number> {
    const template = await prisma.template.findFirst({ where: { id: templateId, user_email: userEmail } });
    const movements = await prisma.template.findMany({ where: { id: { in: movementsIds }, user_email: userEmail } });

    if (!template || (movements.length !== movementsIds.length)) {
      return 0;
    }

    const result = await prisma.movementTemplates.createMany({
      data: movementsIds.map(movementId => ({
        template_id: templateId,
        movement_id: movementId,
      })),
    })

    return result.count;
  }
}
