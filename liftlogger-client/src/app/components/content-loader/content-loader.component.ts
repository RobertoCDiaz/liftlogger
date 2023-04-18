import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-loader',
  templateUrl: './content-loader.component.html',
  styleUrls: ['./content-loader.component.sass'],
})
export class ContentLoaderComponent implements OnInit, OnChanges {
  /**
   * Control boolean that determines if the content should be displayed or not.
   *
   * @default false
   */
  @Input() displayIf: boolean = false;

  /**
   * Whether the content is secondary or not.
   *
   * Secondary content will have a lighter shade of gray for the loader component.
   *
   * @default false
   */
  @Input() isSecondary: boolean = false;

  /**
   * How many lines of text should be rendered as loading.
   *
   * @default 1
   */
  @Input() lineCount: number = 1;

  /**
   * Control array to display multiple lines of loaders.
   */
  arrCount = [0];

  /**
   * Heigh the loader will have. Expressed in `rem` units. Should be similar to the text to be displayed.
   *
   * @default 1 // 1rem
   */
  @Input() fontSize: number = 1;

  /**
   * Theming for the `ngx-skeleton-loader` component.
   */
  theme = {};

  ngOnInit() {
    this.theme = {
      padding: 0,
      margin: 0,
      height: this.fontSize + 'rem',
    };
  }

  ngOnChanges() {
    this.updatePlaceholdersCount();
  }

  /**
   * Setups the `arrCount` array to display the desired amount of loader lines.
   */
  updatePlaceholdersCount() {
    this.arrCount = new Array(this.lineCount).fill(0);
  }
}
