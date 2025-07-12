import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserSession } from 'src/app/interfaces/user-session';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../interfaces/LoginRequest.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    const loginRequest = this.loginForm.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: () => {
        this.router.navigateByUrl('/articles');
      },
      error: () => this.error = 'Identifiants incorrects'
    });
  }
}
