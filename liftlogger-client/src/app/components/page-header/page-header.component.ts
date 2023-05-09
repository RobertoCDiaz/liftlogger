import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

/**
 * Displays a consistent header for pages in the app. It displays a title for the page, along
 * with a back button to go one page back.
 */
@Component({
  selector: 'app-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.sass'],
})
export class PageHeaderComponent {
  constructor(private location: Location) {}

  /**
   * Sets the title to display in the header.
   */
  @Input() pageTitle: string;

  /**
   * Goes back to the previous opened page in the browser.
   */
  goBack(): void {
    this.location.back();
  }
}
