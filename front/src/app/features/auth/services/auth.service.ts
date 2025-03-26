import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';
  public isLoggedIn = false;

  constructor(private httpClient: HttpClient) { }

  login(username: string): Observable<any> {
    return this.httpClient.post(`${this.pathService}/login`, { username }, { 
      withCredentials: true,
      responseType: 'text' // <== tell Angular to expect plain text
    }).pipe(
      tap(() => (this.isLoggedIn = true))
    );
  }
}
