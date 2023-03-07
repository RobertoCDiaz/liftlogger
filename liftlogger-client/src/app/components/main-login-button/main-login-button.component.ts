import { Component } from '@angular/core';
import { AuthService as OAuthService } from '@auth0/auth0-angular';
import { AuthService } from 'src/app/services/auth.service';

/**
 * Temporal login button inside the main page. The main page is not
 * even supposed to be shown to anonymous users, but before implementing
 * landing page, login should be accessible somewhere.
 * TODO: delete this temporal TEMPORAL COMPONENT
 */
@Component({
  selector: 'app-main-login-button',
  templateUrl: './main-login-button.component.html',
  styleUrls: ['./main-login-button.component.sass']
})
export class MainLoginButtonComponent {
  isLoggedIn: boolean = false;
  pictureUrl: string;
  userEmail: string;

  constructor(public oAuthService: OAuthService, private authService: AuthService) { }

  ngOnInit() {
    this.oAuthService.user$.subscribe(user => {
      if (!user || !user.picture || !user.email) {
        return;
      }

      this.isLoggedIn = user !== undefined && user !== null;

      this.pictureUrl = user.picture;
      this.userEmail = user.email;
    });
  }

  async handleLogin() {
    if (this.isLoggedIn) {
      return;
    }

    this.authService.login();
  }

  handleLogout() {
    this.authService.logOut();
  }

}
