import { TestBed } from '@angular/core/testing';

import { WeightingsService } from './weightings.service';

describe('WeightingsService', () => {
  let service: WeightingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeightingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
