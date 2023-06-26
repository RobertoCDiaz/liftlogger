import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  /**
   * API URL.
   */
  private url = environment.serverUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * Makes a GET request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @param params Query params
   * @returns Response from request
   */
  get<ReturnType>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): Observable<ReturnType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap((tokenId: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

        return this.http.get<ReturnType>(
          this.url + endpoint,
          params ? { headers, params } : { headers },
        );
      }),
    );
  }

  /**
   * Makes a POST request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @param body Body parameters for the POST request
   * @param params Query params
   * @returns Response from request
   */
  post<BodyType, ResponseType>(
    endpoint: string,
    body: BodyType,
    params?: Record<string, string | number | boolean>,
  ): Observable<ResponseType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap(tokenId => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

        return this.http.post<ResponseType>(
          this.url + endpoint,
          body,
          params ? { headers, params } : { headers },
        );
      }),
    );
  }

  /**
   * Makes a PUT request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @param body Body parameters for the PUST request
   * @param params Query params
   * @returns Response from request
   */
  put<BodyType, ResponseType>(
    endpoint: string,
    body: BodyType,
    params?: Record<string, string | number | boolean>,
  ): Observable<ResponseType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap(tokenId => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

        return this.http.put<ResponseType>(
          this.url + endpoint,
          body,
          params ? { headers, params } : { headers },
        );
      }),
    );
  }

  /**
   * Makes a DELETE request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @param params Query params
   * @returns Response from request
   */
  delete<ResponseType>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
  ): Observable<ResponseType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap(tokenId => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

        return this.http.delete<ResponseType>(
          this.url + endpoint,
          params ? { headers, params } : { headers },
        );
      }),
    );
  }
}
