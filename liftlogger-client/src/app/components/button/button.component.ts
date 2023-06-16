import { Component, EventEmitter, Input, Output } from '@angular/core';

// Different Buttons
enum ButtonType {
  'default' = 'default',
  'primary' = 'primary',
  'no-border' = 'no-border',
}

/**
 * Basic button component for the app.
 *
 * This component has the capability to create different types of buttons by just setting
 * a property. Can be enabled/disabled to prevent users from clicking. Can show an icon from
 * the `materials-icon` library. And could serve as an anchor `a` tag and have the usage of a link.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass'],
})
export class ButtonComponent {
  /**
   * Type of the button to be displayed.
   */
  @Input() type: keyof typeof ButtonType = ButtonType['default'];

  /**
   * Whether user interaction should be possible or not.
   */
  @Input() disabled: boolean = false;

  /**
   * Icon to be showed. If not icon is specified, the button
   * will only show its text.
   */
  @Input() icon?: string;

  /**
   * If the button should behave as a link (e.g. an anchor tag), define
   * the `href` using this property. If no `href` is defined, the button
   * will behave as a `button` component.
   */
  @Input() href?: string;

  /**
   * Whether this button should act as a submit button for forms.
   */
  @Input() isSubmitButton: boolean = false;

  /**
   * Fires up when the button is clicked.
   */
  @Output() onClicked = new EventEmitter<void>();

  /**
   * Emits the `onClicked` button only if the button is enabled.
   */
  onButtonClicked(): void {
    if (this.disabled) {
      return;
    }

    this.onClicked.emit();
  }
}
