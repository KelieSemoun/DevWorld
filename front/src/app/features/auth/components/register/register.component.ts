import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { Router } from '@angular/router';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: false
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
    });
  }

  register(): void {
    if (this.registerForm.invalid) return;
  
    const request = this.registerForm.value as RegisterRequest;
  
    this.authService.register(request).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Registration failed. Please try again.';
      },
    });
  }
}
