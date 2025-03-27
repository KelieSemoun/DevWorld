import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserSession } from 'src/app/interfaces/user-session';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  error = '';

  constructor(private authService: AuthService,
              private router: Router,
              private sessionService: SessionService) 
              {}

  login(): void {
    this.authService.login(this.username).subscribe({
      next: (response: UserSession) => {
        this.sessionService.logIn(response);
        this.router.navigate(['/topics']);
      },
      error: () => this.error = 'Login failed. Try again.'
    });
  }
}
