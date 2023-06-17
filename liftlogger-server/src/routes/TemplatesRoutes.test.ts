import { Template } from '@prisma/client';
import TemplateController from '../controllers/TemplateController';
import { getNewTemplateFixture, getTemplatesFixture } from '../fixtures/TemplateFixtures';
import { emailRequestMock } from '../mocks/request.mock';
import {
  TemplateCreationRequestParams,
  TemplateUpdateRequestParams,
} from '../models/TemplateModel';
import { TemplateRoutes } from './TemplatesRoutes';

describe('TemplateRoutes', () => {
  const routesController: TemplateRoutes = new TemplateRoutes();
  const templateController: TemplateController = routesController.templatesController;

  describe('getTemplate()', () => {
    it('should fetch a template using the controller', async () => {
      const testTemplate = getTemplatesFixture()[0];
      const spy = jest.spyOn(templateController, 'getTemplate').mockResolvedValue(testTemplate);

      const result = await routesController.getTemplate(1, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(1, emailRequestMock.user_email);
      expect(result).toEqual(testTemplate);
    });

    it('should return undefined and 404 if no template found', async () => {
      jest.spyOn(templateController, 'getTemplate').mockResolvedValue(null);

      const result = await routesController.getTemplate(1234, emailRequestMock);

      expect(routesController.getStatus()).toBe(404);
      expect(result).toBeUndefined();
    });
  });

  describe('getTemplatesFromUser()', () => {
    it('should fetch user templates using the controller', async () => {
      const testTemplates = getTemplatesFixture();
      const spy = jest.spyOn(templateController, 'getTemplates').mockResolvedValue(testTemplates);

      const result = await routesController.getTemplatesFromUser(emailRequestMock);

      expect(spy).toHaveBeenCalledWith(emailRequestMock.user_email);
      expect(result).toEqual(testTemplates);
    });
  });

  describe('createTemplate()', () => {
    it('should create a new template through controller', async () => {
      const newTemplate = getNewTemplateFixture();
      const movsTest: number[] = [1, 5, 22];
      const resultTest = getTemplatesFixture()[0];
      const spy = jest.spyOn(templateController, 'create').mockResolvedValue(resultTest);
      const mockParams: TemplateCreationRequestParams = {
        template: newTemplate,
        movements_ids: movsTest,
      };

      const result = await routesController.createTemplate(mockParams, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(
        {
          ...mockParams.template,
          user_email: emailRequestMock.user_email,
        },
        mockParams.movements_ids,
      );

      expect(result).toEqual(resultTest);
    });

    it('should be able to create a template without movements', async () => {
      const newTemplate = getNewTemplateFixture();
      const resultTest = getTemplatesFixture()[0];
      const spy = jest.spyOn(templateController, 'create').mockResolvedValue(resultTest);
      const mockParams: TemplateCreationRequestParams = {
        template: newTemplate,
      };

      const result = await routesController.createTemplate(mockParams, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(
        {
          ...mockParams.template,
          user_email: emailRequestMock.user_email,
        },
        undefined,
      );

      expect(result).toEqual(resultTest);
    });
  });

  describe('updateTemplate()', () => {
    let testId: number;
    let testBody: TemplateUpdateRequestParams;

    let testResult: Template;

    beforeEach(() => {
      testId = 1;
      testBody = {
        template: getNewTemplateFixture(),
        movements_ids: [1, 2, 6, 7],
      };
      testResult = getTemplatesFixture()[0];
    });

    it('should call controller to update template', async () => {
      const spy = jest.spyOn(templateController, 'updateTemplate').mockResolvedValue(testResult);
      jest.spyOn(templateController, 'getTemplate').mockResolvedValue(testResult);

      const result = await routesController.updateTemplate(testId, testBody, emailRequestMock);

      expect(spy).toBeCalledWith(testId, testBody.template, testBody.movements_ids);
      expect(result).toEqual(testResult);
    });

    it('should return 404 & undefined if user is not owner of template', async () => {
      const spy = jest.spyOn(routesController, 'setStatus');

      // act as if no template with matching id for user is found
      jest.spyOn(templateController, 'getTemplate').mockResolvedValue(null);

      const result = await routesController.updateTemplate(testId, testBody, emailRequestMock);

      expect(spy).toHaveBeenCalledWith(404);
      expect(result).toBeFalsy();
    });

    it('should be able to only update template data and not movements', async () => {
      testBody.movements_ids = undefined;
      const spy = jest.spyOn(templateController, 'updateTemplate').mockResolvedValue(testResult);
      jest.spyOn(templateController, 'getTemplate').mockResolvedValue(testResult);

      const result = await routesController.updateTemplate(testId, testBody, emailRequestMock);

      expect(spy).toBeCalledWith(testId, testBody.template, undefined);
      expect(result).toEqual(testResult);
    });
  });

  describe('deleteTemplate()', () => {
    it('should call delete template from controller', async () => {
      const testId: number = 1;
      const spy = jest.spyOn(templateController, 'deleteTemplate').mockResolvedValue(true);

      await routesController.deleteTemplate(testId, emailRequestMock);

      expect(spy).toHaveBeenCalled();
    });
  });
});
