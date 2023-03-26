import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, switchMap } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  /**
   * API URL.
   */
  private url = environment.serverUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Makes a GET request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @returns Response from request
   */
  get<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap((tokenId: string) => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);
        return this.http.get<ReturnType>(this.url + endpoint, { headers });
      })
    );
  }

  /**
   * Makes a GET request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @param body Body parameters for the POST request
   * @returns Response from request
   */
  post<BodyType, ResponseType>(endpoint: string, body: BodyType): Observable<ResponseType> {
    return this.authService.getAccessTokenSilently().pipe(
      switchMap(tokenId => {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

        return this.http.post<ResponseType>(this.url + endpoint, body, { headers });
      })
    );
  }
}
