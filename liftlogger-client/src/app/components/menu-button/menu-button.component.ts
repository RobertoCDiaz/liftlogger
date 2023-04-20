import { Component, Input } from '@angular/core';

/**
 * Button component to display in the dashboard as a main feature of the app.
 */
@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.sass'],
})
export class MenuButtonComponent {
  /**
   * Text to display.
   */
  @Input() text: String = 'menu-button';

  /**
   * Icon to associate to the button. Must be from the MaterialIcons library: https://fonts.google.com/icons.
   */
  @Input() icon: String = 'home';

  /**
   * Where to redirect the user when button is clicked.
   */
  @Input() href: String = '/';

  MenuButtonComponent() {}
}
