import { Injectable } from '@angular/core';
import { AuthService as OAuthService, User } from '@auth0/auth0-angular';
import { lastValueFrom, Observable } from 'rxjs';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oAuthService: OAuthService, private http: HttpService) { }

  /**
   * Fetches the information for the current user, such as email, profile
   * picture, auth method, etc.
   *
   * @returns User object, or null if not user was logged in.
   */
  getUserInfo(): Observable<User | null | undefined> {
    return this.oAuthService.user$;
  }

  /**
   * Opens the LogIn page.
   *
   * If `shouldSignUp === true`, it opens up the Sign Up page directly. Defaults to `false`.
   */
  async login(shouldSignUp: boolean = false) {
    this.oAuthService.loginWithPopup({
      authorizationParams: {
        prompt: 'login',
        screen_hint: shouldSignUp ? 'signup' : 'login',
      },
    }).subscribe(async value => {
      await this.tryToCreateUser();
    });
  }

  /**
   * Logs out from current session.
   */
  async logOut() {
    this.oAuthService.logout();
  }

  /**
   * Sends a request to the backend to try to create the current logged user.
   *
   * As Auth0 users are stored in their own database, LiftLogger needs a way to
   * create every user once they login for the first time. This is done in the `auth/createUser`
   * backend endpoint, but to make sure they are stored once they login, we need to make the request
   * every time a user logs in.
   */
  private async tryToCreateUser() {
    this.oAuthService.user$.subscribe(async user => {
      if (!user) {
        return;
      }

      const createRequest = await this.http.postAuth<{ email: string }, boolean>('auth/createUser', { email: user.email || '' });

      createRequest.subscribe();
    });
  }

  getAuth0Service() {
    return this.oAuthService;
  }
}
