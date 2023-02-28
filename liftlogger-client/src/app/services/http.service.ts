import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private url = 'http://localhost:3001/';

  constructor(private http: HttpClient) { }

  get<ReturnType>(endpoint: string): Observable<ReturnType> {
    return this.http.get<ReturnType>(this.url + endpoint);
  }

  post<BodyType, ResponseType>(endpoint: string, body: BodyType): Observable<ResponseType> {
    return this.http.post<ResponseType>(this.url + endpoint, body);
  }
}
