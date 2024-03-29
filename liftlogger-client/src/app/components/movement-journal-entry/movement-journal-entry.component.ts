import { Component, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { MovementJournalEntry } from 'src/app/models/MovementJournalEntry';

@Component({
  selector: 'app-movement-journal-entry',
  templateUrl: './movement-journal-entry.component.html',
  styleUrls: ['./movement-journal-entry.component.sass'],
})
export class MovementJournalEntryComponent implements OnChanges {
  /**
   * MovementJournalEntry used to populate the component's view.
   */
  @Input() entry: MovementJournalEntry;

  /**
   * Date of the entry already formatted to be displayed.
   */
  entryDateString: string;

  ngOnChanges() {
    if (!this.entry) {
      return;
    }

    this.entryDateString = moment(this.entry.date).format('MMMM Do, Y');
  }
}
