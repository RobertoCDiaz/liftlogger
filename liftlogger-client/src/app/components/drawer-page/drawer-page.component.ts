import { Component, Input } from '@angular/core';

/**
 * Base component to create a page with an AppBar and the common drawer.
 *
 * This component is intended to use as base for every page accessible from the
 * `MainSideNav` component.
 */
@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer-page.component.html',
  styleUrls: ['./drawer-page.component.sass']
})
export class DrawerPageComponent {
  /**
   * Name of the page. This value will be places as `title` for the `AppBar` component.
   */
  @Input() pageName: string;

  /**
   * Icon to use as ActionButton in the AppBar. It must be an
   * icon from https://fonts.google.com/icons.
   */
  @Input() actionIcon: string;

  /**
   * Where should the ActionButton redirect to.
   */
  @Input() actionUrl: string;
}
