import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import * as moment from 'moment';

// TODO: extract period logic to its own service?
/**
 * Represents a time period, which can be either "YTD" (year-to-date), "All", or a string
 * representing a number of days, week, months, or years (in the format `${amount: number}${'d' | 'w' | 'm' | 'y'}`).
 */
export type Period = 'YTD' | 'All' | `${number}${'d' | 'w' | 'm' | 'y'}`;

/**
 * Defines the shape for an input data-point.
 */
export type GraphInput = {
  /**
   * Value it will be given in the y-axis.
   * E.g.: Weight, Intensity Value, etc.
   */
  data: number,

  /**
   * Value to graph in the x-axis. Commonly, a date unix timestamp.
   */
  date: number,
};

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.sass'],
})
export class GraphComponent implements OnChanges {
  /**
   * Actual data to plot.
   */
  @Input() data: GraphInput[] = [];

  /**
   * Currently selected period of data to display.
   *
   * @see {@link Period}
   */
  @Input() period: Period = '3m';

  /**
   * Whether the Period Select should be displayed.
   *
   * I.e.: Whether the user can modify the period of the graph.
   *
   * @default true
   */
  @Input() showPeriodSelector: boolean = true;

  /**
   * Whether the y-axis grid and values should be shown in the graph or not.
   *
   * @default false
   */
  @Input() displayYAxis: boolean = false;

  /**
   * Name to show for each data point. This will give
   * a name to the units, for example, use "Weight (kg)" to
   * display it along every data point as "Weight(kg): 70".
   *
   * @default "Value"
   */
  @Input() dataLabel: string = 'Value';

  /**
   * Show an additional dataset with the media values of the main dataset
   * up until each date.
   *
   * @default false
   */
  @Input() showMediaValues: boolean = false;

  /**
   * Whether a fake dataset should be displayed or not.
   *
   * @default false
   */
  @Input() showFakeData: boolean = false;

  /**
   * Chart.js object.
   */
  chartObject: Chart;

  /**
   * Array of available periods to display in the graph and choose from.
   *
   * @see {@link Period}
   * @default
   * ['1m', '3m', '6m', '1y', 'YTD', 'All']
   */
  @Input() availablePeriods: Period[] = ['1m', '3m', '6m', '1y', 'YTD', 'All'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.setupGraph();
  }

  /**
   * Updates the current period of data to display to a new one.
   *
   * @param value New period
   */
  changePeriod(value: Period) {
    if (this.data.length <= 0) {
      return;
    }

    this.period = value;
    this.setupGraph();
  }

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
      'd': 'days',
      'w': 'weeks',
      'm': 'months',
      'y': 'years',
    };

    return moment().subtract(amount, unitsParser[units]);
  }

  /**
   * Setup the actual graph view, using the `chart.js` library.
   * It applies the given configuration params.
   */
  setupGraph() {
    // only includes entries within the selected period
    const filteredEntries = this.data.filter(entry =>
      moment(entry.date) > this.parsePeriod(this.period)
    ).sort((a, b) => a.date - b.date);

    // include medias values
    let accumulator = 0;
    const mediasData = filteredEntries.map<number>((currentEntry, idx) => {
      accumulator += currentEntry.data

      return accumulator / (idx + 1);
    });

    // on update, destroy previous chart
    if (this.chartObject) {
      this.chartObject.destroy();
    }

    const canvas = document.querySelector('canvas')!;
    const ctx = canvas.getContext('2d')!;

    this.chartObject = new Chart(ctx, {
      type: 'line',
      data: !this.showFakeData ? {
        labels: filteredEntries.map((d) => new Date(d.date).toLocaleDateString()),
        datasets: [
          {
            label: this.dataLabel,
            data: filteredEntries.map((d, i) => d.data),
            cubicInterpolationMode: 'monotone',
            borderColor: this.showMediaValues ? '#0373DB60' : '#0373DB',
            borderWidth: this.showMediaValues ? 1.5 : 2,
            fill: false,
          },
          {
            label: 'Media Value:',
            data: this.showMediaValues ? mediasData : [],
            cubicInterpolationMode: 'monotone',
            borderColor: '#0373DB',
            borderWidth: 2
          }
        ],
      } : {
        // fake data
        labels: new Array(30).fill(0).map((_, idx) => moment().subtract(30 - idx, 'days').format('DD/MM/YYYY')),
        datasets: [
          {
            label: this.dataLabel,
            data: new Array(30).fill(0).map((d, idx) => idx * idx),
            cubicInterpolationMode: 'monotone',
            borderColor: '#80808020',
            borderWidth: 1.5,
            fill: false,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            bottom: 8,
            left: 16,
            right: 16,
          },
        },
        elements: {
          point: {
            radius: 1,
          }
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            type: 'category',
            grid: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 3,
            }
          },
          y: {
            beginAtZero: false,
            display: this.displayYAxis,
            grid: {
              drawTicks: false,
            },
          },
        },
      },
    });
  }
}
