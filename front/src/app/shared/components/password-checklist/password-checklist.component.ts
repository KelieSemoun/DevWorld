import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-password-checklist',
    templateUrl: './password-checklist.component.html',
    styleUrls: ['./password-checklist.component.scss'],
    standalone: false
})
export class PasswordChecklistComponent implements OnChanges {
  @Input() password: string = '';

  status = {
    minLength: false,
    hasDigit: false,
    hasLower: false,
    hasUpper: false,
    hasSpecial: false
  };

  ngOnChanges(): void {
    const val = this.password || '';
    this.status.minLength = val.length >= 8;
    this.status.hasDigit = /\d/.test(val);
    this.status.hasLower = /[a-z]/.test(val);
    this.status.hasUpper = /[A-Z]/.test(val);
    this.status.hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(val);
  }
}
