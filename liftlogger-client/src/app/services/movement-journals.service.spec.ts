import { TestBed } from '@angular/core/testing';

import { MovementJournalsService } from './movement-journals.service';
import { getEntriesFixture } from '../fixtures/movements-journals.fixture';
import * as moment from 'moment';
import { MovementMonthlyJournal } from '../models/MovementJournalEntry';

describe('MovementJournalsService', () => {
  let service: MovementJournalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementJournalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBestSession', () => {
    it('should return the session with the highest score', () => {
      const bestSession = service.getBestSession(getEntriesFixture());
      expect(bestSession).toEqual(getEntriesFixture()[1]);
    });
  });

  describe('getLastSession', () => {
    it('should return the most recent session', () => {
      const lastSession = service.getLastSession(getEntriesFixture());
      expect(lastSession).toEqual(getEntriesFixture()[0]);
    });
  });

  describe('getPRSession', () => {
    it('should return the session with the highest weight lifted', () => {
      const prSession = service.getPRSession(getEntriesFixture());
      expect(prSession).toEqual(getEntriesFixture()[2]);
    });
  });

  describe('getMonthyJournals()', () => {
    it('should take a list of movement journal entries and separate it in months', () => {
      const testEntries = getEntriesFixture();
      testEntries[0].date = new Date('2023-05-02');

      const result = service.getMonthyJournals(testEntries);
      const starts = result.map(m => moment(m.startOfMonth).format('Y-MM-DD'));

      expect(result).toHaveSize(2);
      expect(starts).toContain('2022-03-01');
      expect(starts).toContain('2023-05-01');
    });
  });

  describe('getMonthlyJournalStringName()', () => {
    it('should return a default string representation in the format `MMMM, Y`', () => {
      const testMonthlyJournal: MovementMonthlyJournal = {
        startOfMonth: new Date('2022-03-01'),
        entries: getEntriesFixture(),
      };

      const result = service.getMonthlyJournalStringName(testMonthlyJournal);

      expect(result).toBe('March, 2022');
    });

    it('should return the specified string representation for a monthly movement journal', () => {
      const testMonthlyJournal: MovementMonthlyJournal = {
        startOfMonth: new Date('2022-03-01'),
        entries: getEntriesFixture(),
      };

      const format: string = 'MMM - Y';

      const result = service.getMonthlyJournalStringName(testMonthlyJournal, format);

      expect(result).toBe('Mar - 2022');
    });
  });
});
