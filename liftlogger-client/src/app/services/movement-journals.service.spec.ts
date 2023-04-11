import { TestBed } from '@angular/core/testing';

import { MovementJournalsService } from './movement-journals.service';
import { entriesFixture } from '../fixtures/movements-journals.fixture';

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
      const bestSession = service.getBestSession(entriesFixture);
      expect(bestSession).toEqual(entriesFixture[1]);
    });
  });

  describe('getLastSession', () => {
    it('should return the most recent session', () => {
      const lastSession = service.getLastSession(entriesFixture);
      expect(lastSession).toEqual(entriesFixture[0]);
    });
  });

  describe('getPRSession', () => {
    it('should return the session with the highest weight lifted', () => {
      const prSession = service.getPRSession(entriesFixture);
      expect(prSession).toEqual(entriesFixture[2]);
    });
  });
});
