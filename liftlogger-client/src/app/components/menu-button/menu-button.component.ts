import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-menu-button',
  templateUrl: './menu-button.component.html',
  styleUrls: ['./menu-button.component.sass']

})
export class MenuButtonComponent {

  @Input() text: String = 'menu-button';
  @Input() icon: String = 'home';
  @Input() href: String = '/';

  MenuButtonComponent() {

  }

}
