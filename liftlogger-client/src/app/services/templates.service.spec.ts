import { TestBed } from '@angular/core/testing';

import { TemplatesService } from './templates.service';
import { HttpService } from './http.service';
import { getNewTemplateFixture, getTemplatesFixture } from '../fixtures/templates.fixture';
import { of } from 'rxjs';
import { AppModule } from '../app.module';
import { MuscleGroup } from '../models/MuscleGroupModel';
import { Movement, MovementToTemplateModel } from '../models/MovementModel';

describe('TemplatesService', () => {
  let service: TemplatesService;

  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(TemplatesService);

    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserTemplates()', () => {
    it('should make a get request to fetch user templates at the /templates endpoint', () => {
      const testTemplates = getTemplatesFixture();
      const spy = spyOn(http, 'get').and.returnValue(of(testTemplates));

      service.getUserTemplates().subscribe(result => {
        expect(spy).toHaveBeenCalledWith('templates');
        expect(result).toEqual(testTemplates);
      });
    });
  });

  describe('getTemplate()', () => {
    it('should make a get request to fetch a template of the user', () => {
      const testTemplate = getTemplatesFixture()[0];
      const testId = 3;
      const spy = spyOn(http, 'get').and.returnValue(of(testTemplate));

      service.getTemplate(testId).subscribe(result => {
        expect(spy).toHaveBeenCalledWith('templates/' + testId);
        expect(result).toEqual(testTemplate);
      });
    });
  });

  describe('createTemplate()', () => {
    it('should make a post request to create a new template', () => {
      const testTemplate = getNewTemplateFixture();
      const testIds = [1, 4, 6];
      const spy = spyOn(http, 'post').and.returnValue(of(testTemplate));

      service.createTemplate(testTemplate, testIds).subscribe(result => {
        expect(spy).toHaveBeenCalledWith('templates', {
          template: testTemplate,
          movements_ids: testIds,
        });
        expect(result.name).toBe(testTemplate.name);
        expect(result.description).toBe(testTemplate.description!);
      });
    });

    it('should work even if no movements provided', () => {
      const testTemplate = getNewTemplateFixture();
      const spy = spyOn(http, 'post').and.returnValue(of(testTemplate));

      service.createTemplate(testTemplate).subscribe(result => {
        expect(spy).toHaveBeenCalledWith('templates', {
          template: testTemplate,
          movements_ids: undefined,
        });
        expect(result.name).toBe(testTemplate.name);
        expect(result.description).toBe(testTemplate.description!);
      });
    });
  });

  describe('updateTemplate()', () => {
    const testId = 2;
    const testTemplate = getNewTemplateFixture();
    const movsIds = [1, 4, 6];
    let putSpy: jasmine.Spy;

    beforeEach(() => {
      putSpy = spyOn(http, 'put').and.returnValue(of(testTemplate));
    });

    it('should make a request to update a new template', () => {
      service.updateTemplate(testId, testTemplate, movsIds).subscribe(result => {
        expect(putSpy).toHaveBeenCalledWith('templates/' + testId, {
          template: testTemplate,
          movements_ids: movsIds,
        });
        expect(result.name).toBe(testTemplate.name);
        expect(result.description).toBe(testTemplate.description!);
      });
    });

    it('should work even if no movements provided', () => {
      service.updateTemplate(testId, testTemplate).subscribe(result => {
        expect(putSpy).toHaveBeenCalledWith('templates/' + testId, {
          template: testTemplate,
          movements_ids: undefined,
        });
        expect(result.name).toBe(testTemplate.name);
        expect(result.description).toBe(testTemplate.description!);
      });
    });
  });

  describe('deleteTemplate', () => {
    it('should make a request to delete a template', () => {
      const testId: number = 3;
      const deleteSpy = spyOn(http, 'delete').and.returnValue(of(''));

      service.deleteTemplate(testId).subscribe(_ => {
        expect(deleteSpy).toHaveBeenCalledWith('templates/' + testId);
      });
    });
  });

  describe('getMuscleGroupsFromTemplate()', () => {
    it('should get the names of the muscle groups contained in a template', () => {
      const testTemplate = getTemplatesFixture()[2];

      // mocks groups in movements
      testTemplate.movements = [
        {
          movement: {
            groups: [
              {
                name: 'Chest',
              } as MuscleGroup,
            ],
          } as Movement,
        } as MovementToTemplateModel,
        {
          movement: {
            groups: [
              {
                name: 'Chest',
              } as MuscleGroup,
              {
                name: 'Back',
              } as MuscleGroup,
            ],
          } as Movement,
        } as MovementToTemplateModel,
      ];

      const result = service.getMuscleGroupsFromTemplate(testTemplate);

      expect(result).toEqual(new Set(['Chest', 'Back']));
    });
  });
});
