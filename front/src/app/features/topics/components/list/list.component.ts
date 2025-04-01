import { Component, OnInit} from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';
import { UserService } from '../../services/user.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent{

  public topics$: Observable<Topic[]> = combineLatest([
    this.topicApiService.all(),
    this.authService.session$
  ]).pipe(
    map(([topics, session]) => {
      return topics.map(topic => ({
        ...topic,
        isSubscribed: session?.user.subscribedTopicIds.includes(topic.id!) ?? false
      }));
    })
  );

  constructor(private topicApiService: TopicApiService,
              private userService: UserService,
              private authService: AuthService) 
              { }

  subscribe(topic: Topic) {
    const userId = this.authService.currentUser?.user.id;
    if (!userId || !topic.id) return;

    this.userService.subscribe(userId, topic.id).subscribe({
      next: () => topic.isSubscribed = true,
      error: err => console.error('Subscription failed', err)
    });
  }
}
