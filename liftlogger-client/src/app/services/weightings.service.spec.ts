import { TestBed } from '@angular/core/testing';

import { WeightingsService } from './weightings.service';
import { AppModule } from '../app.module';
import { HttpService } from './http.service';
import { of } from 'rxjs';
import { getWeightingsFixture } from '../fixtures/weightings.fixture';

describe('WeightingsService', () => {
  let service: WeightingsService;
  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(WeightingsService);

    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createEntry()', () => {
    it('should make a request to create a new entry', (done: DoneFn) => {
      const testWeighting = getWeightingsFixture()[0];
      const postSpy = spyOn(http, 'post').and.returnValue(of(testWeighting));

      service.createEntry(testWeighting).subscribe(entry => {
        expect(postSpy).toHaveBeenCalledWith('weightings', testWeighting);
        expect(entry).toEqual(testWeighting);

        done();
      });
    });
  });

  describe('getUserEntries()', () => {
    it('should request to fetch the user weightings', (done: DoneFn) => {
      const testWeightings = getWeightingsFixture();
      const getSpy = spyOn(http, 'get').and.returnValue(of(testWeightings));

      service.getUserEntries().subscribe(entries => {
        expect(getSpy).toHaveBeenCalled();
        expect(entries).toEqual(testWeightings);

        done();
      });
    });
  });
});
