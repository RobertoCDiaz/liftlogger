import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { lastValueFrom, Observable } from 'rxjs';
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
   * Makes a simple GET request to the application's backend.
   *
   * @param endpoint API endpoint to make the request to
   * @returns Response from request
   */
  get<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.http.get<ReturnType>(this.url + endpoint);
  }

  /**
   * Makes a simple POST request to the application's backend.
   *
   * @param endpoint API endpoint to make the request to
   * @param body Body parameters for the POST request
   * @returns Response from request
   */
  post<BodyType, ResponseType>(endpoint: string, body: BodyType): Observable<ResponseType> {
    return this.http.post<ResponseType>(this.url + endpoint, body);
  }

  /**
   * Makes a GET request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @returns Response from request
   */
  async getAuth<ReturnType>(endpoint: string): Promise<Observable<ReturnType>> {
    const tokenId = await lastValueFrom(this.authService.getAccessTokenSilently());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

    return this.http.get<ReturnType>(this.url + endpoint, { headers });
  }

  /**
   * Makes a GET request to the application's backend appending a Authorization Bearer token to it.
   * This means that it will be an Auth request, a request with user information.
   *
   * @param endpoint API endpoint to make the request to
   * @returns Response from request
   */
  async postAuth<BodyType, ResponseType>(endpoint: string, body: BodyType): Promise<Observable<ResponseType>> {
    const tokenId = await lastValueFrom(this.authService.getAccessTokenSilently());

    const headers = new HttpHeaders().set('Authorization', `Bearer ${tokenId}`);

    return this.http.post<ResponseType>(this.url + endpoint, body, { headers });
  }
}
