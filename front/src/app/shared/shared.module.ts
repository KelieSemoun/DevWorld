import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChecklistComponent } from './components/password-checklist/password-checklist.component';
import { BackButtonComponent } from './components/back-button/back-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PasswordChecklistComponent,
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    PasswordChecklistComponent,
    BackButtonComponent
  ]
})
export class SharedModule {}
