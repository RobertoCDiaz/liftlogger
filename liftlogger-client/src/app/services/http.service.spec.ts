import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { AppModule } from '../app.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { of } from 'rxjs';
import { environment } from 'src/environment/environment';

describe('HttpService', () => {
  let service: HttpService;
  let http: HttpClient;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AppModule] });
    service = TestBed.inject(HttpService);

    http = TestBed.inject(HttpClient);
    authService = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('get()', () => {
    const testToken = 'T0K3N';
    const testReturn: string = '200';
    const url = environment.serverUrl;

    it('should make a get request', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testReturn));
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.get<string>('test').subscribe(value => {
        expect(value).toBe(testReturn);
        expect(spy).toHaveBeenCalled();

        done();
      });
    });

    it('should get access token and use it in request along with the server url', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.get<string>('test').subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', { headers: testHeader });

        done();
      });
    });
  });

  describe('post()', () => {
    const testToken = 'T0K3N';
    const testBody = 1;
    const testReturn: string = '200';
    const url = environment.serverUrl;

    it('should make a post request', (done: DoneFn) => {
      const spy = spyOn(http, 'post').and.returnValue(of(testReturn));
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.post<number, string>('test', testBody).subscribe(value => {
        expect(value).toBe(testReturn);
        expect(spy).toHaveBeenCalled();

        done();
      });
    });

    it('should get access token and use it in request along with the server url and the specified body', (done: DoneFn) => {
      const spy = spyOn(http, 'post').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.post<number, string>('test', testBody).subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', testBody, { headers: testHeader });

        done();
      });
    });
  });
});
