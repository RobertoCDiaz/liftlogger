import { TestBed } from '@angular/core/testing';

import { MovementsService } from './movements.service';
import { AppModule } from '../app.module';

describe('MovementsService', () => {
  let service: MovementsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(MovementsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
