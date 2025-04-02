import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserSession } from 'src/app/interfaces/user-session';
import { LoginRequest } from '../interfaces/LoginRequest.interface';
import { RegisterRequest } from '../interfaces/RegisterRequest.interface';
import { UpdateUserRequest } from '../interfaces/UpdateUserRequest.interface';
import { UserProfile } from '../interfaces/UserProfile.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private pathService = 'api/auth';
  private sessionSubject = new BehaviorSubject<UserSession | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(loginRequest: LoginRequest): Observable<UserSession> {
    return this.httpClient.post<UserSession>(`${this.pathService}/login`, loginRequest, { 
      withCredentials: true
    }).pipe(
      tap(user => {
        this.sessionSubject.next(user);
        localStorage.setItem('userSession', JSON.stringify(user));
      })
    );
  }

  register(registerRequest: RegisterRequest): Observable<void> {
    return this.httpClient.post<void>(`${this.pathService}/register`, registerRequest);
  }

  getProfile(): Observable<UserProfile> {
    return this.httpClient.get<UserProfile>(`${this.pathService}/me`);
  }  

  updateProfile(data: UpdateUserRequest): Observable<UserSession> {
    return this.httpClient.put<UserSession>(`${this.pathService}/me`, data).pipe(
      tap(user => {
        this.sessionSubject.next(user);
        localStorage.setItem('userSession', JSON.stringify(user));
      })
    );
  }  

  logout(): void{
    this.sessionSubject.next(null);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userSession');
  }

  restoreSession(): void {
    const sessionJson = localStorage.getItem('userSession');
    if (sessionJson) {
      this.sessionSubject.next(JSON.parse(sessionJson));
    }
  }
}
