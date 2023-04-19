import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphComponent } from './graph.component';
import { getComponent, getElements } from 'src/app/helpers/testing.helper';
import { Period } from 'src/app/services/periods.service';

describe('GraphComponent', () => {
  let component: GraphComponent;
  let fixture: ComponentFixture<GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphComponent);
    component = fixture.componentInstance;
    component.data = [
      {
        data: 7.5,
        date: new Date('2023-04-14'),
      },
      {
        data: 9,
        date: new Date('2023-04-15'),
      },
      {
        data: 10,
        date: new Date('2023-04-16'),
      },
    ];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a canvas', () => {
    const canvas = getComponent(fixture, 'canvas');

    expect(canvas).toBeTruthy();
  });

  describe('.showPeriodSelector', () => {
    it('should show period selector by default', () => {
      const periodSelectorElement = getComponent(fixture, '.period-selector');

      expect(periodSelectorElement).toBeTruthy();
    });

    it('should hide period selector when false', () => {
      component.showPeriodSelector = false;
      fixture.detectChanges();

      const periodSelectorElement = getComponent(fixture, '.period-selector');

      expect(periodSelectorElement).toBeFalsy();
    });

    it('should show period selector when true', () => {
      component.showPeriodSelector = true;
      fixture.detectChanges();

      const periodSelectorElement = getComponent(fixture, '.period-selector');

      expect(periodSelectorElement).toBeTruthy();
    });
  });

  describe('Period Selector', () => {
    const testPeriods: Period[] = ['2m', '4y', '2w', '1d'];

    it('should correctly render available periods', () => {
      component.availablePeriods = testPeriods;
      fixture.detectChanges();

      const periodItemsElements: HTMLSpanElement[] = getElements(fixture, '.period-selector .item');

      expect(periodItemsElements).toHaveSize(testPeriods.length);

      periodItemsElements.forEach((periodElement, idx) =>
        expect(periodElement.textContent?.trim()).toBe(testPeriods[idx]),
      );
    });

    it('should change period when a period is clicked', () => {
      component.availablePeriods = testPeriods;
      fixture.detectChanges();

      const periodItemsElements: HTMLSpanElement[] = getElements(fixture, '.period-selector .item');

      periodItemsElements.forEach((periodElement, idx) => {
        periodElement.click();

        expect(component.period).toEqual(testPeriods[idx]);
      });
    });

    it('should highlight selected period', () => {
      component.availablePeriods = testPeriods;
      fixture.detectChanges();

      let highlightedElements: HTMLSpanElement[] = getElements(fixture, '.selected');

      // because the currently available periods don't have the default selected period (3m),
      // there are no highlighted periods
      expect(highlightedElements).toHaveSize(0);

      const periodItemsElements: HTMLSpanElement[] = getElements(fixture, '.period-selector .item');

      periodItemsElements.forEach(periodItem => {
        periodItem.click();
        fixture.detectChanges();

        highlightedElements = getElements(fixture, '.selected');

        expect(highlightedElements).toHaveSize(1);
        expect(highlightedElements[0]).toBe(periodItem);
      });
    });
  });

  describe('changePeriod()', () => {
    it('should change the selected period', () => {
      const periods: Period[] = ['19d', '6w', '18m', '3y', 'All', 'YTD'];

      periods.forEach(period => {
        component.changePeriod(period);

        expect(component.period).toBe(period);
      });
    });
  });
});
