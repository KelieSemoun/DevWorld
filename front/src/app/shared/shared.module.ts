import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordChecklistComponent } from './components/password-checklist/password-checklist.component';

@NgModule({
  declarations: [PasswordChecklistComponent],
  imports: [CommonModule],
  exports: [PasswordChecklistComponent]
})
export class SharedModule {}
