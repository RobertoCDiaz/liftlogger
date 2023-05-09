import { TestBed } from '@angular/core/testing';

import { MovementsService } from './movements.service';
import { AppModule } from '../app.module';
import { HttpService } from './http.service';
import { of } from 'rxjs';
import { getMovementsFixture } from '../fixtures/movements.fixture';
import { getEntriesFixture } from '../fixtures/movements-journals.fixture';
import { getMuscleGroupsFixture } from '../fixtures/muscle-groups.fixture';

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
});
