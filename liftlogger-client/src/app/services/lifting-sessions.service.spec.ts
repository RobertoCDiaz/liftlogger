import { TestBed } from '@angular/core/testing';

import { LiftingSessionsService } from './lifting-sessions.service';
import { AppModule } from '../app.module';
import { LiftingSessionCreationParams } from '../models/LiftingSessionModel';
import { LiftingSetCreationParams } from '../models/LiftingSetModel';
import { HttpService } from './http.service';
import { liftingSessionsFixture } from '../fixtures/liftingsessions.fixture';
import { of } from 'rxjs';
import { subscribeSpyTo } from '@hirez_io/observer-spy';

fdescribe('LiftingSessionsService', () => {
  let service: LiftingSessionsService;

  let http: HttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
    });
    service = TestBed.inject(LiftingSessionsService);

    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createSession()', () => {
    it('should merge session data and reps and call service to create session with it', () => {
      const mockSession: LiftingSessionCreationParams = {
        end_time: new Date('2023-07-05T14:10:39'),
        start_time: new Date('2023-07-05T13:02:55'),
        notes: 'Just some notes',
      };
      const mockSets: LiftingSetCreationParams[] = [
        { movement_id: 1, reps: 12, weight: 123 },
        { movement_id: 1, reps: 11, weight: 123 },
      ];
      const mockResult = liftingSessionsFixture[0];
      const postSpy = spyOn(http, 'post').and.returnValue(of(mockResult));

      const result = service.createSession(mockSession, mockSets);

      const spy = subscribeSpyTo(result);

      expect(spy.getLastValue()).toEqual(mockResult);
      expect(postSpy).toHaveBeenCalledWith('sessions/', { session: mockSession, sets: mockSets });
    });
  });
});
