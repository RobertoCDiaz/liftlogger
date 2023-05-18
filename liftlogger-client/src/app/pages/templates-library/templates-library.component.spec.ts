import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatesLibraryComponent } from './templates-library.component';
import { AppModule } from 'src/app/app.module';
import { TemplatesService } from 'src/app/services/templates.service';
import { of } from 'rxjs';
import { getTemplatesFixture } from 'src/app/fixtures/templates.fixture';

describe('TemplatesLibraryComponent', () => {
  let component: TemplatesLibraryComponent;
  let fixture: ComponentFixture<TemplatesLibraryComponent>;

  let templatesService: TemplatesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TemplatesLibraryComponent],
      imports: [AppModule],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplatesLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    templatesService = TestBed.inject(TemplatesService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit()', () => {
    it('should call templates services to fecth user templates', () => {
      const testTemplates = getTemplatesFixture();
      const spy = spyOn(templatesService, 'getUserTemplates').and.returnValue(of(testTemplates));

      component.ngOnInit();

      component.templates$.subscribe(result => {
        expect(spy).toHaveBeenCalled();
        expect(result).toEqual(testTemplates);
      });
    });
  });
});
