import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../features/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {}

  canActivate(): boolean {
    const user = this.authService.currentUser();
    if (user) {
      return true;
    }
    return false;
  }
}
