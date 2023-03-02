import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

/**
 * Serves as a base component for any page that can create a DB entity. It was
 * originally designed to be the base of the template/movement/group creator,
 * but it could be used for many more things.
 */
@Component({
  selector: 'app-creator-page',
  templateUrl: './creator-page.component.html',
  styleUrls: ['./creator-page.component.sass'],
})
export class CreatorPageComponent {

  /**
   * Name of the page. This wil be placed as the title in the header bar.
   */
  @Input() title: String = '$title';

  /**
   * Placeholder for the main input, commonly used for the item's name.
   */
  @Input() inputTitle: String = '$inputTitle';

  /**
   * Whether the `Create` button should be enabled or not.
   *
   * Any page that uses this base can define their own criteria for when
   * the creation if finally enabled.
   */
  @Input() createEnabled: boolean = false;

  /**
   * Event that fires once the `Create` button is clicked.
   */
  @Output() onCreate = new EventEmitter<void>();

  /**
   * This fires up when the main input is modified.
   *
   * `$event: string` object is the value is  for the modified input.
   */
  @Output() titleChanged = new EventEmitter<string>();

  /**
   * This fires up when the description input is modified.
   *
   * `$event: string` object is the value is  for the modified input.
   */
  @Output() descriptionChanged = new EventEmitter<string>();

  constructor(private router: Router) { }

  /**
   * Navigates one page back when `Cancel` is clicked.
   */
  onCancelClicked(): void {
    this.router.navigate([".."]);
  }

  /**
   * Emits the `onCreate` EventEmitter when the `Create` button is clicked.
   */
  onCreateClicked(): void {
    this.onCreate.emit();
  }

  /**
   * Emits the `titleChanged` EventEmitter when the main input is modified.
   *
   * @param value Value to be passed in the EventEmitter
   */
  onTitleChanged(value: string): void {
    this.titleChanged.emit(value);
  }

  /**
   * Emits the `descriptionChanged` EventEmitter when the description input is modified.
   *
   * @param value Value to be passed in the EventEmitter
   */
  onDescriptionChanged(value: string): void {
    this.descriptionChanged.emit(value);
  }

}
