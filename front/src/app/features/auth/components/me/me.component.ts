import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { UserService } from 'src/app/features/topics/services/user.service';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { Topic } from 'src/app/features/topics/interfaces/topic.interface';
import { UpdateUserRequest } from '../../interfaces/UpdateUserRequest.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {
  profileForm!: FormGroup;
  subscribedTopics: Topic[] = [];
  userId!: number;
  keepPassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const userSession = this.authService.currentUser();
    if (!userSession) return;
  
    const user = userSession.user;

    this.userId = user.id;
    this.profileForm = this.fb.group({
      username: [user.username, Validators.required],
      email: [user.email, [Validators.required, Validators.email]],
      password: [{value: '', disabled: this.keepPassword}, passwordValidator],
    });
  
    this.userService.getSubscribedTopics(this.userId).subscribe(topics => {
      this.subscribedTopics = topics;
    });
  }
  
  onKeepPasswordToggle(): void {
    this.keepPassword = !this.keepPassword;
    const passwordControl = this.profileForm.get('password');
  
    if (this.keepPassword) {
      passwordControl?.disable();
      passwordControl?.reset(); // Clear password
    } else {
      passwordControl?.enable();
    }
  }

  saveChanges(): void {
    if (this.profileForm.invalid) return;
  
    const formValue = this.profileForm.value;

    const updateProfileRequest: UpdateUserRequest = {
      username: formValue.username,
      email: formValue.email,
      password: this.keepPassword ? '' : formValue.password
    };
  
    this.authService.updateProfile(updateProfileRequest).subscribe({
      next: () => {
        this.snackBar.open('Informations mises à jour !', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-success']
        });
        
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Erreur inattendue', 'Fermer', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    });
  }
  

  unsubscribe(topicId: number): void {
    this.userService.unsubscribeToTopic(this.userId, topicId).subscribe(() => {
      this.subscribedTopics = this.subscribedTopics.filter(t => t.id !== topicId);
    });
  }
}
