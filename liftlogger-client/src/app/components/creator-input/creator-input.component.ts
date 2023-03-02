import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Text input designed for the `app-creator-page` component. This
 * is used for the main and description inputs, as it can be used
 * as a regular input, or a text-area when needed.
 */
@Component({
  selector: 'app-creator-input',
  templateUrl: './creator-input.component.html',
  styleUrls: ['./creator-input.component.sass']
})
export class CreatorInputComponent {

  /**
   * Whether the input should use a `textarea` as base component or not.
   * When not, it'll use a regular `input` tag.
   *
   * By default is set to `false`.
   */
  @Input() isTextArea: boolean = false;

  /**
   * Value for the placeholder.
   */
  @Input() placeholder: String;

  /**
   * Whether the input should be elongated or not.
   *
   * A title input is longer (e.g. has a bigger font-size).
   *
   * By default is set to false.
   */
  @Input() isTitle: boolean = false;

  /**
   * Event that listens to changes in the input's value.
   *
   * `$event: string` new value after change.
   */
  @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Stores the current value for the input.
   */
  value: string;

  /**
   * Emits the `valueChanged` event, and passes the new input's value to it.
   */
  onValueChanged(): void {
    this.valueChanged.emit(this.value);
  }
}
