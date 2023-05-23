import { TestBed } from '@angular/core/testing';

import { TemplatesService } from './templates.service';
import { HttpService } from './http.service';
import { getNewTemplateFixture, getTemplatesFixture } from '../fixtures/templates.fixture';
import { of } from 'rxjs';
import { AppModule } from '../app.module';

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

  describe('getMuscleGroupsFromTemplate()', () => {
    it('should get the names of the muscle groups contained in a template', () => {
      const testTemplate = getTemplatesFixture()[2];

      const result = service.getMuscleGroupsFromTemplate(testTemplate);

      expect(result).toEqual(new Set(['Chest', 'Back']));
    });
  });
});