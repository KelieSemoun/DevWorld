import { Component, OnInit} from '@angular/core';
import { map, Observable } from 'rxjs';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';
import { UserService } from '../../services/user.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit{

  public topics$: Observable<Topic[]> = this.topicApiService.all();

  constructor(private topicApiService: TopicApiService,
              private userService: UserService,
              private sessionService: SessionService
  ) { }

  ngOnInit(): void {
      this.topics$ = this.topicApiService.all().pipe(
        map(topics => 
          topics.map(topic => ({
            ...topic,
            isSubscribed: this.sessionService.userSession?.subscribedTopicIds.includes(topic.id!)
          }))
        )
      )
  }

  subscribe(topic: Topic) {
    const userId = this.sessionService.userSession!.id;
    this.userService.subscribe(userId, topic.id!).subscribe({
      next: () => topic.isSubscribed = true,
      error: err => console.error('Subscription failed', err)
    });
  }
}
