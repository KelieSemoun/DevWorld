import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { UserService } from 'src/app/features/topics/services/user.service';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { Topic } from 'src/app/features/topics/interfaces/topic.interface';
import { UpdateUserRequest } from '../../interfaces/UpdateUserRequest.interface';

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
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const session = this.authService.currentUser();
    if (!session) return;
  
    const { id, username, email } = session.user;
  
    this.userId = id;
  
    this.profileForm = this.fb.group({
      username: [username, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.keepPassword }, passwordValidator]
    });
  
    this.userService.getSubscribedTopics(id).subscribe(topics => {
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

    const updateProfileRequest = this.profileForm.value as UpdateUserRequest;

    this.authService.updateProfile(updateProfileRequest).subscribe(() => {
      alert('Informations mises à jour !');
    });
  }

  unsubscribe(topicId: number): void {
    this.userService.unsubscribeToTopic(this.userId, topicId).subscribe(() => {
      this.subscribedTopics = this.subscribedTopics.filter(t => t.id !== topicId);
    });
  }
}
