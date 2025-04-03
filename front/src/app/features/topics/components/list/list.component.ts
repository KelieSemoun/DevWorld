import { Component, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public topics$: Observable<Topic[]> = of([]);
  private userId!: number;

  constructor(
    private topicApiService: TopicApiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.currentUser();
    if (!user) return;
  
    this.userId = user.user.id;
  
    this.userService.getSubscribedTopics(this.userId).subscribe(subscribedTopics => {
      const subscribedTopicIds = subscribedTopics.map(topic => topic.id);
  
      this.topics$ = this.topicApiService.all().pipe(
        map(topics =>
          topics.map(topic => ({
            ...topic,
            isSubscribed: subscribedTopicIds.includes(topic.id!)
          }))
        )
      );
    });
  }  

  subscribeToTopic(topic: Topic): void {
    this.userService.subscribeToTopic(this.userId, topic.id!).subscribe({
      next: () => (topic.isSubscribed = true),
      error: err => console.error('Subscription failed', err),
    });
  }
}
