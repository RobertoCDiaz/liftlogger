import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageHeaderComponent } from './page-header.component';
import { Location } from '@angular/common';
import { getElement } from 'src/app/helpers/testing.helper';

describe('PageHeaderComponent', () => {
  let component: PageHeaderComponent;
  let fixture: ComponentFixture<PageHeaderComponent>;
  let locationService: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    locationService = TestBed.inject(Location);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the page title', () => {
    const testTitle: string = 'This title will be used for testing';

    component.pageTitle = testTitle;

    const titleEl: HTMLParagraphElement = getElement(fixture, '#title');

    expect(titleEl.textContent?.trim()).toBe(testTitle);
  });

  it('should trigger location.back when back button is pressed', () => {
    const spy = spyOn(locationService, 'back');

    const backButton: HTMLSpanElement = getElement(fixture, '#back-button');
    backButton.click();

    expect(spy).toHaveBeenCalled();
  });
});
