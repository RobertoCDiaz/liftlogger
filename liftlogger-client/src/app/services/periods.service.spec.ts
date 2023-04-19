import { TestBed } from '@angular/core/testing';

import { Period, PeriodsService } from './periods.service';
import * as moment from 'moment';

describe('PeriodsService', () => {
  let service: PeriodsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('parsePeriod', () => {
    it('should correctly parse periods', () => {
      const testCases: { period: Period; expected: moment.Moment }[] = [
        {
          period: '1m',
          expected: moment().subtract(1, 'month'),
        },
        {
          period: '5m',
          expected: moment().subtract(5, 'months'),
        },
        {
          period: '7y',
          expected: moment().subtract(7, 'years'),
        },
        {
          period: '2w',
          expected: moment().subtract(2, 'weeks'),
        },
        {
          period: '16d',
          expected: moment().subtract(16, 'days'),
        },
        {
          period: 'YTD',
          expected: moment().startOf('year'),
        },
        {
          period: 'All',
          expected: moment(0),
        },
      ];

      testCases.forEach(test => {
        const result = service.parsePeriod(test.period);

        expect(result.format('DD/MM/Y')).toBe(test.expected.format('DD/MM/Y'));
      });
    });
  });
});
