import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarComponent } from './calendar.component';
import { getElements } from 'src/app/helpers/testing.helper';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalendarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should correctly highlight the specified days', () => {
    const hightlitedDays: Set<number> = new Set([1, 5, 9, 16, 22]);

    component.highlightedDays = hightlitedDays;

    const highlightedElements: HTMLDivElement[] = getElements(fixture, '.day.highlighted');

    expect(highlightedElements).toHaveSize(hightlitedDays.size);
    highlightedElements.forEach(highlighted => {
      const labelElement = highlighted.querySelector('.day-label');

      expect(hightlitedDays).toContain(parseInt(labelElement?.textContent?.trim()!));
    });
  });

  it('should correctly set the month to be displayed', () => {
    component.month = new Date('2020-08-03');
    component.ngOnChanges();
    fixture.detectChanges();

    expect(component.monthMoment.format('DD/MM/YYYY')).toBe('01/08/2020');
  });

  it('should not generate more than a whole week of empty days', () => {
    const months: Date[] = [
      '2023-04-01',
      '2023-02-01',
      '2023-01-01',
      '2022-02-01',
      '2020-05-15',
    ].map(date => new Date(date));

    months.forEach(month => {
      component.month = month;
      component.ngOnChanges();

      const emptyCells: HTMLParagraphElement[] = getElements(fixture, '.emptyDay');

      expect(emptyCells.length).toBeLessThan(7);
    });
  });
});
