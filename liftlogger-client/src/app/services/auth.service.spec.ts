import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { AppModule } from '../app.module';
import { AuthService as Auth0Service, User } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';
import { HttpService } from './http.service';

describe('AuthServiceService', () => {
  let service: AuthService;
  let auth0: Auth0Service;
  let router: Router;
  let http: HttpService;

  const testUser: User = {
    email: 'testing@test.com',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: Auth0Service,
          useValue: {
            user$: of(testUser),
            loginWithPopup: () => of(undefined),
            logout: () => of(undefined),
          },
        },
      ],
    });
    service = TestBed.inject(AuthService);

    auth0 = TestBed.inject(Auth0Service);
    router = TestBed.inject(Router);
    http = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getUserInfo()', () => {
    it("it should return auth0's user$ observable", () => {
      let emitted: User | null = null;
      service.getUserInfo().subscribe(user => {
        emitted = user!;
      });

      expect(emitted!).toEqual(testUser);
    });
  });

  describe('login()', () => {
    it('should redirect user if authenticated', () => {
      const spy = spyOn(router, 'navigate');
      spyOn(service, 'isAuthenticated').and.returnValue(true);

      service.login();

      expect(spy).toHaveBeenCalled();
    });

    it('should login or signup if not authenticated', () => {
      const spy = spyOn(auth0, 'loginWithPopup').and.returnValue(of());

      spyOn(service, 'isAuthenticated').and.returnValue(false);
      service.login(false);

      expect(spy).toHaveBeenCalledWith({
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'login',
        },
      });

      spy.calls.reset();
      service.login(true);

      expect(spy).toHaveBeenCalledWith({
        authorizationParams: {
          prompt: 'login',
          screen_hint: 'signup',
        },
      });
    });

    it('should call tryToCreateUser method and set isAuthenticated localStorage state to true after login in', () => {
      const localStorageSpy = spyOn(window.localStorage, 'setItem');
      const createUserSpy = spyOn(service, 'tryToCreateUser');

      spyOn(service, 'isAuthenticated').and.returnValue(false);
      spyOn(router, 'navigate');

      service.login();

      expect(createUserSpy).toHaveBeenCalled();
      expect(localStorageSpy).toHaveBeenCalledWith(
        `${environment.auth0ClientId}.isAuthenticated`,
        'true',
      );
    });
  });

  describe('logOut()', () => {
    it("calls auth0's logout method", () => {
      const spy = spyOn(auth0, 'logout').and.returnValues(of(undefined));

      service.logOut();

      expect(spy).toHaveBeenCalled();
    });

    it('should remove localStorage auth state', () => {
      const spy = spyOn(window.localStorage, 'removeItem');

      service.logOut();

      expect(spy).toHaveBeenCalledWith(environment.auth0ClientId + '.isAuthenticated');
    });
  });

  describe('isAuthenticated()', () => {
    it('should return localStorage auth state', () => {
      const localStorageSpy = spyOn(window.localStorage, 'getItem').and.returnValue('false');

      let result = service.isAuthenticated();

      expect(result).toBeFalse();

      localStorageSpy.and.returnValue('true');

      result = service.isAuthenticated();
      expect(result).toBeTrue();
    });
  });

  describe('tryToCreateUser()', () => {
    it('should make a post request to create a new user', () => {
      const httpSpy = spyOn(http, 'post').and.returnValue(of(undefined));

      service.tryToCreateUser();

      expect(httpSpy).toHaveBeenCalledWith('auth/createUser', {
        email: testUser.email,
      });
    });
  });

  describe('getAuth0Service()', () => {
    it('should return the auth0 service instance', () => {
      const result = service.getAuth0Service();

      expect(result).toEqual(auth0);
    });
  });
});
