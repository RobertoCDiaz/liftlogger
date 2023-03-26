import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.sass'],
})
export class SearchBarComponent {
  /**
   * Fires up when the search query has changed.
   *
   * param: `$event` Current query
   */
  @Output() queryChanged = new EventEmitter<string>();

  /**
   * Holds the value for the current query.
   */
  query: string;

  /**
   * Emits the `queryChanged` event.
   */
  changeQuery() {
    this.queryChanged.emit(this.query);
  }
}
