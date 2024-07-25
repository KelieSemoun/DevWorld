import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../interfaces/loginRequest.interface';
import {AuthService} from "../../services/auth.service";
import {SessionInformation} from "../../interfaces/sessionInformation.interface";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public hide = true;
  public onError = false;
  public errorMessage = "";

  public form = this.fb.group({
    login: [
      '',
      [
        Validators.required
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.min(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-=\\[\\]{};:"\\\\|,.<>\\/?]).+$')
      ]
    ]
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private sessionService: AuthService) {
  }

  public submit(): void {
    const loginRequest = this.form.value as LoginRequest;
    this.authService.login(loginRequest).subscribe({
      next: (sessionInformation: SessionInformation) => {
        this.sessionService.logIn(sessionInformation);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        this.onError = true;
        console.log(error);
      }
    });
  }
  public goHome(): void {
    this.router.navigate(['']);
  }
}
