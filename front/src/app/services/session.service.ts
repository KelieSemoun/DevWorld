import { Injectable } from '@angular/core';
import { UserSession } from '../interfaces/user-session';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public userSession: UserSession | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: UserSession): void {
    this.userSession = user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.userSession = undefined;
    this.isLogged = false;
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }
}
