import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementJournalComponent } from './movement-journal.component';

describe('MovementJournalComponent', () => {
  let component: MovementJournalComponent;
  let fixture: ComponentFixture<MovementJournalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovementJournalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementJournalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
