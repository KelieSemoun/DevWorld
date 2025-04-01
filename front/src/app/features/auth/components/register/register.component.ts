import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  error = '';
  passwordRequirements = {
    minLength: false,
    hasDigit: false,
    hasLowercase: false,
    hasUppercase: false,
    hasSpecialChar: false
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
    });
  }

  register(): void {
    if (this.registerForm.invalid) return;

    const request = this.registerForm.value as RegisterRequest;

    this.authService.register(request).subscribe({
      next: () => this.router.navigate(['/login']),
      error: () => (this.error = 'Registration failed. Please try again.'),
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
  
    const isValid =
      value.length >= 8 &&
      /[0-9]/.test(value) &&            // chiffre
      /[a-z]/.test(value) &&            // minuscule
      /[A-Z]/.test(value) &&            // majuscule
      /[!@#$%^&*(),.?":{}|<>]/.test(value); // spécial
  
    return isValid ? null : { invalidPassword: true };
  }

  onPasswordInput(): void {
    const value = this.registerForm.get('password')?.value || '';
    this.passwordRequirements.minLength = value.length >= 8;
    this.passwordRequirements.hasDigit = /[0-9]/.test(value);
    this.passwordRequirements.hasLowercase = /[a-z]/.test(value);
    this.passwordRequirements.hasUppercase = /[A-Z]/.test(value);
    this.passwordRequirements.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
