import { Component} from '@angular/core';
import { Observable } from 'rxjs';
import { TopicApiService } from '../../services/topic-api.service';
import { Topic } from '../../interfaces/topic.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent{

  public topics$: Observable<Topic[]> = this.topicApiService.all();

  constructor(private topicApiService: TopicApiService) { }

  ngOnInit() {
    console.log("ListComponent loaded");
  }
}
