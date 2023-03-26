import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as OAuthService, User } from '@auth0/auth0-angular';
import { from, map, Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private oAuthService: OAuthService,
    private http: HttpService,
    private router: Router,
  ) {}

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
    if (this.isAuthenticated()) {
      this.router.navigate(['/dashboard']);
      return;
    }

    this.oAuthService
      .loginWithPopup({
        authorizationParams: {
          prompt: 'login',
          screen_hint: shouldSignUp ? 'signup' : 'login',
        },
      })
      .subscribe(value => {
        this.tryToCreateUser();

        localStorage.setItem(environment.auth0ClientId + '.isAuthenticated', 'true');
        this.router.navigate(['/dashboard']);
      });
  }

  /**
   * Logs out from current session.
   */
  async logOut() {
    this.oAuthService.logout().subscribe(value => {
      localStorage.removeItem(environment.auth0ClientId + '.isAuthenticated');
    });
  }

  /**
   * Checks for user authentication.
   *
   * @returns Whether the user is authenticated or not.
   */
  isAuthenticated(): boolean {
    return localStorage.getItem(environment.auth0ClientId + '.isAuthenticated') === 'true';
  }

  /**
   * Sends a request to the backend to try to create the current logged user.
   *
   * As Auth0 users are stored in their own database, LiftLogger needs a way to
   * create every user once they login for the first time. This is done in the `auth/createUser`
   * backend endpoint, but to make sure they are stored once they login, we need to make the request
   * every time a user logs in.
   */
  private tryToCreateUser() {
    this.oAuthService.user$.subscribe(user => {
      if (!user) {
        return;
      }

      const createRequest = this.http.post<{ email: string }, boolean>('auth/createUser', {
        email: user.email || '',
      });

      createRequest.subscribe();
    });
  }

  getAuth0Service() {
    return this.oAuthService;
  }
}
