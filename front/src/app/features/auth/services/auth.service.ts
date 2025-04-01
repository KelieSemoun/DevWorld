import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserSession } from 'src/app/interfaces/user-session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private pathService = 'api/auth';
  private sessionSubject = new BehaviorSubject<UserSession | null>(null);
  session$ = this.sessionSubject.asObservable();

  constructor(private httpClient: HttpClient) { }

  login(username: string): Observable<UserSession> {
    return this.httpClient.post<UserSession>(`${this.pathService}/login`, { username }, { 
      withCredentials: true
    }).pipe(
      tap(user => {
        this.sessionSubject.next(user);
        localStorage.setItem('userSession', JSON.stringify(user));
      })
    );
  }

  logout(): void{
    this.sessionSubject.next(null);
    localStorage.removeItem('userSession');
  }

  get currentUser(): UserSession | null {
    return this.sessionSubject.value;
  }

  restoreSession(): void {
    const sessionJson = localStorage.getItem('userSession');
    if (sessionJson) {
      this.sessionSubject.next(JSON.parse(sessionJson));
    }
  }
}
