import { TestBed } from '@angular/core/testing';

import { GroupsService } from './groups.service';
import { AppModule } from '../app.module';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(GroupsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
