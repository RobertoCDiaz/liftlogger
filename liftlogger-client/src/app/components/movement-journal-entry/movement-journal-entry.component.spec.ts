import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementJournalEntryComponent } from './movement-journal-entry.component';

describe('MovementJournalEntryComponent', () => {
  let component: MovementJournalEntryComponent;
  let fixture: ComponentFixture<MovementJournalEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovementJournalEntryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovementJournalEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
