import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { UserSession } from 'src/app/interfaces/user-session';
import { LoginRequest } from '../interfaces/LoginRequest.interface';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { UpdateUserRequest } from '../interfaces/UpdateUserRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathService = 'api/auth';

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<UserSession> {
    return this.httpClient.post<UserSession>(`${this.pathService}/login`, loginRequest, { 
      withCredentials: true
    }).pipe(
      tap(user => {
        localStorage.setItem('userSession', JSON.stringify(user));
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<{ message: string }> {
    return this.httpClient.post<{ message: string }>(`${this.pathService}/register`, registerRequest);
  }

  updateProfile(data: UpdateUserRequest): Observable<UserSession> {
    return this.httpClient.put<UserSession>(`${this.pathService}/me`, data).pipe(
      tap(user => {
        localStorage.setItem('userSession', JSON.stringify(user));
      })
    );
  }  

  logout(): void{
    localStorage.removeItem('userSession');
  }

  currentUser(): UserSession | null {
    const sessionJson = localStorage.getItem('userSession');
    if (!sessionJson) return null;

    try {
      return JSON.parse(sessionJson) as UserSession;
    } catch {
      return null;
    }
  }
}
