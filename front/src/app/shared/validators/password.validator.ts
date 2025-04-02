import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';

  const isValid =
    value.length >= 8 &&
    /[0-9]/.test(value) &&
    /[a-z]/.test(value) &&
    /[A-Z]/.test(value) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(value);

  return isValid ? null : { invalidPassword: true };
}
