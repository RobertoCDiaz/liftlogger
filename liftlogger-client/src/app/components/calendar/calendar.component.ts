import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as moment from 'moment';

/**
 * A simple calendar component that displays a single month.
 *
 * It is posible to highlight some days.
 */
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.sass'],
})
export class CalendarComponent implements OnInit, OnChanges {
  /**
   * Any date to specify the month to display. Defaults to current month.
   */
  @Input() month: Date = new Date();

  /**
   * List of days of the month to be highlighted.
   */
  @Input() highlightedDays: number[] = [];

  /**
   * An array with the same length as days are in the month being displayed.
   */
  daysInMonth: number[] = [];

  /**
   * Month being displayed in the component expressed as a `moment.Moment`.
   */
  monthMoment: moment.Moment;

  /**
   * Auxiliar array to fill in empty spaces in the calendar component to put the first
   * day of the month in the corresponding day of the week.
   */
  emptySquares: number[];

  ngOnInit() {
    this.updateComponent();
  }

  ngOnChanges() {
    this.updateComponent();
  }

  /**
   * Based on the `initialMonthTime` date, sets up the data to show in the component.
   */
  updateComponent() {
    this.monthMoment = moment(this.month);
    this.daysInMonth = new Array(this.monthMoment.daysInMonth()).fill(0).map((v, i) => i + 1);
    this.emptySquares = new Array(this.monthMoment.startOf('month').day()).fill(0);
  }
}
