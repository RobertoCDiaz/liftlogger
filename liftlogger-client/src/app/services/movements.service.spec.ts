import { TestBed } from '@angular/core/testing';

import { MovementsService } from './movements.service';
import { AppModule } from '../app.module';
import { HttpService } from './http.service';
import { of } from 'rxjs';
import { getMovementsFixture } from '../fixtures/movements.fixture';
import { getEntriesFixture } from '../fixtures/movements-journals.fixture';
import { getMuscleGroupsFixture } from '../fixtures/muscle-groups.fixture';
import { Movement } from '../models/MovementModel';
import { MovementNote } from '../models/MovementNoteModel';
import * as moment from 'moment';

describe('MovementsService', () => {
  let service: MovementsService;
  let http: HttpService;

  const testId: number = 34;
  const testMovement = getMovementsFixture()[0];

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(MovementsService);

    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMovement()', () => {
    it('should make a request to fetch a specific movement using a given id', (done: DoneFn) => {
      const getSpy = spyOn(http, 'get').and.returnValue(of(testMovement));

      service.getMovement(testId).subscribe(_ => {
        expect(getSpy).toHaveBeenCalledWith('movements/' + testId);

        done();
      });
    });

    it('should return the response of the request', (done: DoneFn) => {
      spyOn(http, 'get').and.returnValue(of(testMovement));

      service.getMovement(testId).subscribe(movement => {
        expect(movement).toEqual(testMovement);

        done();
      });
    });
  });

  describe('getMovementJournal()', () => {
    const testEntries = getEntriesFixture();
    it('should make a request to fetch the journal entries for a movement', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testEntries));

      service.getMovementJournal(testId).subscribe(entries => {
        expect(spy).toHaveBeenCalledWith('movements/' + testId + '/journal');

        done();
      });
    });

    it('should request for entries puting the most recent first', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testEntries));

      service.getMovementJournal(testId, true).subscribe(entries => {
        expect(spy).toHaveBeenCalledWith('movements/' + testId + '/journal?recentsFirst=true');

        done();
      });
    });

    it('should return the same response as the http request', (done: DoneFn) => {
      spyOn(http, 'get').and.returnValue(of(testEntries));

      service.getMovementJournal(testId, true).subscribe(entries => {
        expect(entries).toEqual(testEntries);

        done();
      });
    });
  });

  describe('createMovement()', () => {
    it('should request to create a movement', () => {
      const testGroups = getMuscleGroupsFixture();
      testGroups[2].isPrimary = true;
      const spy = spyOn(http, 'post').and.returnValue(of(testMovement));

      service.createMovement(testMovement, testGroups).subscribe(movement => {
        expect(spy).toHaveBeenCalledWith('movements', {
          movement: testMovement,
          muscleGroups: testGroups.map(g => ({
            group_id: g.id,
            is_primary: g.isPrimary ?? false,
          })),
        });

        expect(movement).toEqual(testMovement);
      });
    });
  });

  describe('getGroupNames()', () => {
    it('should properly get the group names of a movement', () => {
      const movementWithGroups = getMovementsFixture()[1];
      const expectedNames = ['Chest', 'Back'];

      const result = service.getGroupNames(movementWithGroups);

      expect(result).toEqual(expectedNames);
    });

    it('should return empty array if movement has no groups', () => {
      const movementWithNoGroups = {} as Movement;

      const result = service.getGroupNames(movementWithNoGroups);

      expect(result).toEqual([]);
    });
  });

  describe('getMovementNotes()', () => {
    it('should get the last 3 months notes of a movement by default', () => {
      const testId = 2;
      const mockNotes: MovementNote[] = [
        { id: 1, date: new Date('2023-01-01'), movement_id: testId, notes: 'Just a note' },
        { id: 2, date: new Date('2023-01-03'), movement_id: testId, notes: 'Another note' },
      ];
      const spy = spyOn(http, 'get').and.returnValue(of(mockNotes));

      const from: string = moment().subtract(3, 'months').format('Y-MM-DD');
      const to: string = moment(new Date()).format('Y-MM-DD');

      service.getMovementNotes(testId).subscribe(result => {
        expect(result).toEqual(mockNotes);
        expect(spy).toHaveBeenCalledWith('movements/' + testId + '/notes', { from, to });
      });
    });

    it('should get the notes from a period of a movement', () => {
      const testId = 2;
      const mockNotes: MovementNote[] = [
        { id: 1, date: new Date('2023-01-01'), movement_id: testId, notes: 'Just a note' },
        { id: 2, date: new Date('2023-01-03'), movement_id: testId, notes: 'Another note' },
      ];
      const spy = spyOn(http, 'get').and.returnValue(of(mockNotes));

      const fromStr = '2023-01-01';
      const toStr = '2023-02-28';
      const from: Date = new Date(fromStr);
      const to: Date = new Date(toStr);

      service.getMovementNotes(testId, from, to).subscribe(result => {
        expect(result).toEqual(mockNotes);
        expect(spy).toHaveBeenCalledWith('movements/' + testId + '/notes', {
          from: fromStr,
          to: toStr,
        });
      });
    });
  });
});
