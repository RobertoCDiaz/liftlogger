import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentLoaderComponent } from './content-loader.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { getElement, getElements } from 'src/app/helpers/testing.helper';

describe('ContentLoaderComponent', () => {
  let component: ContentLoaderComponent;
  let fixture: ComponentFixture<ContentLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxSkeletonLoaderModule],
      declarations: [ContentLoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContentLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Display skeleton', () => {
    it('should display skeleton component only if displayIf equals false', () => {
      const skeletonElement = getElement(fixture, 'ngx-skeleton-loader');

      expect(skeletonElement).toBeTruthy();
    });

    it('should NOT display skeleton component only if displayIf equals true', () => {
      component.displayIf = true;

      const skeletonElement = getElement(fixture, 'ngx-skeleton-loader');

      expect(skeletonElement).toBeFalsy();
    });
  });

  describe('Secondary content', () => {
    it('should appear to load primary content if isSecondary equals false', () => {
      const placeholderElements: HTMLElement[] = getElements(fixture, '.content-placeholder');

      placeholderElements.forEach(placeholder => {
        const classes = Array.from(placeholder.classList);

        expect(classes).not.toContain('secondary');
      });
    });

    it('should add secondary class to placeholder if isSecondary equals to true', () => {
      component.isSecondary = true;

      const placeholderElements: HTMLElement[] = getElements(fixture, '.content-placeholder');

      placeholderElements.forEach(placeholder => {
        const classes = Array.from(placeholder.classList);

        expect(classes).toContain('secondary');
      });
    });
  });

  describe('lineCount', () => {
    it('should render only one placeholder by default', () => {
      const placeholderElements = getElements(fixture, 'ngx-skeleton-loader');

      expect(placeholderElements).toHaveSize(1);
    });

    it('should render the amount of placeholders specified via prop', () => {
      const lineCounts = [1, 5, 3, 9, 15];
      lineCounts.forEach(count => {
        component.lineCount = count;
        component.ngOnChanges();

        const placeholderElements: HTMLElement[] = getElements(fixture, 'ngx-skeleton-loader');

        expect(placeholderElements).toHaveSize(count);
      });
    });
  });
});
