import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Component that emulates a Material Design App Bar.
 *
 * You can change the title of this bar, turn on/off the visibility
 * of the menu button, and add an action to it.
 */
@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.sass'],
})
export class AppBarComponent {
  /**
   * Title to show in the AppBar.
   */
  @Input() title: string;

  /**
   * Icon to show as action button in the AppBar. It must be an
   * icon from https://fonts.google.com/icons.
   */
  @Input() actionIcon: string;

  /**
   * Whether if the menu button should be hidden or not.
   */
  @Input() hideMenu: boolean = false;

  /**
   * Where should the action button redirect to.
   */
  @Input() actionUrl: string;

  /**
   * Fires up when the menu button is clicked.
   */
  @Output() menuClicked = new EventEmitter<void>();

  /**
   * Emits the `menuClicked` event.
   */
  fireMenuClicked(): void {
    if (this.hideMenu) {
      return;
    }

    this.menuClicked.emit();
  }
}
