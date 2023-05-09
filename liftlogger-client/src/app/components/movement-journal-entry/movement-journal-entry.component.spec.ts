import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementJournalEntryComponent } from './movement-journal-entry.component';
import { getEntriesFixture } from 'src/app/fixtures/movements-journals.fixture';
import { getElement, getElements } from 'src/app/helpers/testing.helper';
import * as moment from 'moment';

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

  it('should NOT render anything if not entry is specified', () => {
    const detailsContainer = getElement(fixture, '.details-container');
    const setsContainer = getElement(fixture, '.sets-container');

    expect(detailsContainer).toBeFalsy();
    expect(setsContainer).toBeFalsy();
  });

  it('should render details and sets containers when an entry is set', () => {
    component.entry = getEntriesFixture()[0];

    const detailsContainer = getElement(fixture, '.details-container');
    const setsContainer = getElement(fixture, '.sets-container');

    expect(detailsContainer).toBeTruthy();
    expect(setsContainer).toBeTruthy();
  });

  it('should correctly populate component with entry information', () => {
    getEntriesFixture().forEach(entry => {
      component.entry = entry;
      component.ngOnChanges();
      fixture.detectChanges();

      const dateElement: HTMLSpanElement = getElement(fixture, '#entry-date', false);
      const valueElement: HTMLSpanElement = getElement(fixture, '#entry-value', false);
      const setsElements: HTMLDivElement[] = getElements(fixture, '.set', false);

      expect(dateElement.textContent?.trim()).toBe(moment(entry.date).format('MMMM Do, Y'));
      expect(valueElement.textContent?.trim()).toBe(entry.value.toFixed(2));

      setsElements.forEach((set, idx) => {
        const repsEl = set.querySelector('.reps .amount');
        const weightEl = set.querySelector('.weight .amount');

        expect(repsEl?.textContent?.trim()).toBe(entry.session.sets[idx].reps.toString());
        expect(weightEl?.textContent?.trim()).toBe(entry.session.sets[idx].weight.toString());
      });
    });
  });
});
