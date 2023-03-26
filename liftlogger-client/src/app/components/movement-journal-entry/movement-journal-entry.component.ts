import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
  entryDate: string;

  ngOnChanges(changes: SimpleChanges) {
    if (!this.entry) {
      return;
    }

    this.entryDate = moment(this.entry.date * 1000).format('MMMM Do, Y');
  }
}
