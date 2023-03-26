import { Component, Input } from '@angular/core';
import * as moment from 'moment';

/**
 * A simple calendar component that displays a single month.
 *
 * It is posible to highlight some days.
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass']
})
export class CalendarComponent {
  /**
   * Month time for the initial month to be displayed. Defaults to the current month.
   */
  @Input() initialMonthTime: number = moment().unix() * 1000;

  /**
   * List of days of the month to be highlighted.
   */
  @Input() highlightedDays: number[] = [];

  /**
   * An array with the same length as days are in the month being displayed.
   */
  daysInMonth: number[] = [];

  /**
   * Month being displayed in the component.
   */
  currentMonth: moment.Moment;

  /**
   * Auxiliar array to fill in empty spaces in the calendar component to put the first
   * day of the month in the corresponding day of the week.
   */
  emptySquares: number[];

  ngOnInit() {
    this.currentMonth = moment(this.initialMonthTime);
    this.daysInMonth = new Array(this.currentMonth.daysInMonth()).fill(0).map((v, i) => i + 1);
    this.emptySquares = new Array(this.currentMonth.startOf('month').day()).fill(0);
  }

}
