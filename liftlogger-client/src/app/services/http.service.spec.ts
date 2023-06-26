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

    it('should get access token and use it in a get request along with the server url', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.get<string>('test').subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', { headers: testHeader });

        done();
      });
    });

    it('should properly pass query params to request', (done: DoneFn) => {
      const spy = spyOn(http, 'get').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      const testParams = {
        id: 1,
        name: 'another param',
        value: 2.44,
        flag: true,
      };
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.get<string>('test', testParams).subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', { headers: testHeader, params: testParams });

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

    it('should properly pass query params to request', (done: DoneFn) => {
      const spy = spyOn(http, 'post').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      const testParams = {
        id: 1,
        name: 'another param',
        value: 2.44,
        flag: true,
      };
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.post<number, string>('test', testBody, testParams).subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', testBody, {
          headers: testHeader,
          params: testParams,
        });

        done();
      });
    });
  });

  describe('put()', () => {
    const testToken = 'T0K3N';
    const testBody = 1;
    const testReturn: string = '200';
    const url = environment.serverUrl;

    it('should make a put request', (done: DoneFn) => {
      const spy = spyOn(http, 'put').and.returnValue(of(testReturn));
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.put<number, string>('test', testBody).subscribe(value => {
        expect(value).toBe(testReturn);
        expect(spy).toHaveBeenCalled();

        done();
      });
    });

    it('should get access token and use it in request along with the server url and the specified body', (done: DoneFn) => {
      const spy = spyOn(http, 'put').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.put<number, string>('test', testBody).subscribe(_ => {
        expect(spy).toHaveBeenCalledWith(url + 'test', testBody, { headers: testHeader });

        done();
      });
    });

    it('should properly pass query params to request', (done: DoneFn) => {
      const spy = spyOn(http, 'put').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      const testParams = {
        id: 1,
        name: 'another param',
        value: 2.44,
        flag: true,
      };
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.put<number, string>('test', testBody, testParams).subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', testBody, {
          headers: testHeader,
          params: testParams,
        });

        done();
      });
    });
  });

  describe('delete()', () => {
    const testToken = 'T0K3N';
    const testReturn: string = '200';
    const url = environment.serverUrl;

    it('should make a delete request', (done: DoneFn) => {
      const spy = spyOn(http, 'delete').and.returnValue(of(testReturn));
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.delete<string>('test').subscribe(value => {
        expect(value).toBe(testReturn);
        expect(spy).toHaveBeenCalled();

        done();
      });
    });

    it('should get access token and use it in request along with the server url and the specified body', (done: DoneFn) => {
      const spy = spyOn(http, 'delete').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.delete<string>('test').subscribe(_ => {
        expect(spy).toHaveBeenCalledWith(url + 'test', { headers: testHeader });

        done();
      });
    });

    it('should properly pass query params to request', (done: DoneFn) => {
      const spy = spyOn(http, 'delete').and.returnValue(of(testReturn));
      const testHeader = new HttpHeaders().set('Authorization', 'Bearer ' + testToken);
      const testParams = {
        id: 1,
        name: 'another param',
        value: 2.44,
        flag: true,
      };
      spyOn(authService, 'getAccessTokenSilently').and.returnValue(of(testToken));

      service.delete<string>('test', testParams).subscribe(value => {
        expect(spy).toHaveBeenCalledWith(url + 'test', {
          headers: testHeader,
          params: testParams,
        });

        done();
      });
    });
  });
});
