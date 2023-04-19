import { Injectable } from '@angular/core';
import * as moment from 'moment';

/**
 * Represents a time period, which can be either "YTD" (year-to-date), "All", or a string
 * representing a number of days, week, months, or years (in the format `${amount: number}${'d' | 'w' | 'm' | 'y'}`).
 */
export type Period = 'YTD' | 'All' | `${number}${'d' | 'w' | 'm' | 'y'}`;

@Injectable({
  providedIn: 'root',
})
export class PeriodsService {
  constructor() {}

  /**
   * Takes a string in `Period` format and transforms it to the `moment.Moment` representation
   * of the very minimum datetime for that period.
   *
   * @example
   * parsePeriod('15d') -> moment().substract(15, 'days') // 15 days ago
   *
   * @example
   * parsePeriod('3m') -> moment().substract(3, 'months') // 3 months ago
   *
   * @see {@link Period}
   *
   * @param period Period to parse
   * @returns Moment representation of the period
   */
  parsePeriod(period: Period): moment.Moment {
    if (period.toLowerCase() === 'ytd') {
      return moment().startOf('year');
    }
    if (period.toLowerCase() === 'all') {
      return moment(0);
    }

    const amount: number = parseInt(period.slice(0, -1));
    const units: string = period.slice(-1);

    const unitsParser: Record<string, moment.unitOfTime.DurationConstructor> = {
      d: 'days',
      w: 'weeks',
      m: 'months',
      y: 'years',
    };

    return moment().subtract(amount, unitsParser[units]);
  }
}
