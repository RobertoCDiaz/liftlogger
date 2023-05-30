import { PrismaClient } from '@prisma/client';
import PrismaUtils from '../utils/PrismaUtils';
import TemplateController from './TemplateController';
import { getNewTemplateFixture, getTemplatesFixture } from '../fixtures/TemplateFixtures';
import { TemplateCreationParams, TemplateUpdateParams } from '../models/TemplateModel';

const prismaInstance: PrismaClient = PrismaUtils.getPrismaTestingInstance();
const controller: TemplateController = new TemplateController(prismaInstance);

describe('TemplateController', () => {
  afterEach(async () => {
    await prismaInstance.template.deleteMany({
      where: { id: { notIn: getTemplatesFixture().map(t => t.id) } },
    });
  });

  afterAll(() => {
    prismaInstance.$disconnect();
  });

  describe('getTemplates()', () => {
    it('should return all the templates for a user', async () => {
      const testEmail = 'testing@test.com';
      const testTemplates = getTemplatesFixture().filter(
        template => template.user_email === testEmail,
      );

      const result = await controller.getTemplates(testEmail);

      expect(result).toHaveLength(testTemplates.length);
    });
  });

  describe('create()', () => {
    it('should create a new template', async () => {
      const newTemplateData = getNewTemplateFixture();
      const expectedLength = (await prismaInstance.template.count()) + 1;

      let template = await controller.create(newTemplateData);

      expect(await prismaInstance.template.count()).toBe(expectedLength);
      expect(template.name).toBe(newTemplateData.name);
      expect(template.description).toBe(newTemplateData.description);
    });
  });

  describe('getTemplate()', () => {
    it('should return the correct template', async () => {
      const testTemplate = getTemplatesFixture()[0];

      const result = await controller.getTemplate(testTemplate.id, testTemplate.user_email);

      expect(result?.id).toBe(testTemplate.id);
      expect(result?.name).toBe(testTemplate.name);
      expect(result?.description).toBe(testTemplate.description);
      expect(result?.user_email).toBe(testTemplate.user_email);
    });

    it('should return null if no template found', async () => {
      const result = await controller.getTemplate(468, 'not-an-email@testing.com');

      expect(result).toBeFalsy();
    });
  });

  describe('updateTemplate', () => {
    it('should update a templates information', async () => {
      const testTemplateData = getNewTemplateFixture();
      const newData: TemplateUpdateParams = {
        name: 'This is an updated name',
        description: 'This is not the original description',
      };

      let template = await prismaInstance.template.create({ data: testTemplateData });

      expect(template.name).toBe(testTemplateData.name);
      expect(template.description).toBe(testTemplateData.description);

      await controller.updateTemplate(template.id, newData);

      template = (await prismaInstance.template.findFirst({ where: { id: template.id } }))!;

      expect(template.name).toBe(newData.name);
      expect(template.description).toBe(newData.description);
    });

    it('should also be able to update a templates movements', async () => {
      const testTemplateData = getNewTemplateFixture();
      const testMovementIds = [1, 2, 3];

      const newData: TemplateUpdateParams = {
        name: 'This is an updated name',
        description: 'This is not the original description',
      };
      const newMovementIds = [4, 5];

      let template = await prismaInstance.template.create({
        data: { ...testTemplateData, movements: { connect: testMovementIds.map(id => ({ id })) } },
      });
      let movIds: number[] = (
        await prismaInstance.movement.findMany({
          select: { id: true },
          where: { templates: { some: { id: template.id } } },
        })
      ).map(mov => mov.id);

      expect(template.name).toBe(testTemplateData.name);
      expect(template.description).toBe(testTemplateData.description);
      expect(new Set(movIds)).toEqual(new Set(testMovementIds));

      await controller.updateTemplate(template.id, newData, newMovementIds);

      template = (await prismaInstance.template.findFirst({ where: { id: template.id } }))!;
      movIds = (
        await prismaInstance.movement.findMany({
          select: { id: true },
          where: { templates: { some: { id: template.id } } },
        })
      ).map(mov => mov.id);

      expect(template.name).toBe(newData.name);
      expect(template.description).toBe(newData.description);
      expect(new Set(movIds)).toEqual(new Set(newMovementIds));
    });
  });

  describe('deleteTemplate()', () => {
    it('should properly delete a template', async () => {
      const newTemplateData: TemplateCreationParams = getNewTemplateFixture();
      const email = newTemplateData.user_email;
      const realCount: number = await prismaInstance.template.count();

      const newTemplate = await prismaInstance.template.create({ data: newTemplateData });

      let newCount: number = await prismaInstance.template.count();
      let countWithId: number = await prismaInstance.template.count({
        where: { id: newTemplate.id },
      });

      expect(newCount).toBe(realCount + 1);
      expect(countWithId).toBe(1);

      await controller.deleteTemplate(newTemplate.id, email);

      newCount = await prismaInstance.template.count();
      countWithId = await prismaInstance.template.count({ where: { id: newTemplate.id } });

      expect(newCount).toBe(realCount);
      expect(countWithId).toBe(0);
    });

    it('should not delete a template if provided email doesnt own it', async () => {
      const newTemplateData: TemplateCreationParams = getNewTemplateFixture();
      const email = 'another-email@test.com';
      const realCount: number = await prismaInstance.template.count();

      const newTemplate = await prismaInstance.template.create({ data: newTemplateData });

      let newCount: number = await prismaInstance.template.count();
      let countWithId: number = await prismaInstance.template.count({
        where: { id: newTemplate.id },
      });

      expect(newCount).toBe(realCount + 1);
      expect(countWithId).toBe(1);

      await controller.deleteTemplate(newTemplate.id, email);

      newCount = await prismaInstance.template.count();
      countWithId = await prismaInstance.template.count({ where: { id: newTemplate.id } });

      expect(newCount).toBe(realCount + 1);
      expect(countWithId).toBe(1);
    });
  });
});
