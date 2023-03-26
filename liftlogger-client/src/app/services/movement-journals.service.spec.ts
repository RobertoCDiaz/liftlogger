import { TestBed } from '@angular/core/testing';

import { MovementJournalsService } from './movement-journals.service';

describe('MovementJournalsService', () => {
  let service: MovementJournalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementJournalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
