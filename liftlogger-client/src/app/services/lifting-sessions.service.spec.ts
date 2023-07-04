import { TestBed } from '@angular/core/testing';

import { LiftingSessionsService } from './lifting-sessions.service';

describe('LiftingSessionsService', () => {
  let service: LiftingSessionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LiftingSessionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
