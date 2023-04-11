import { TestBed } from '@angular/core/testing';

import { WeightingsService } from './weightings.service';
import { AppModule } from '../app.module';

describe('WeightingsService', () => {
  let service: WeightingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(WeightingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
