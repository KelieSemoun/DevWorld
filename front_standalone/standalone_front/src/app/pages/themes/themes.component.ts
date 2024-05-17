import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect, MatSelectTrigger} from "@angular/material/select";
import {NgForOf, NgIf} from "@angular/common";
import {TranslocoPipe} from "@jsverse/transloco";
import {Topic} from "../../core/models/topic";
import {TopicService} from "../../core/services/topic.service";
import {Router} from "@angular/router";
import {ToasterService} from "../../core/services/toaster.service";
import {MatActionList} from "@angular/material/list";

@Component({
  selector: 'app-themes',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    MatSelectTrigger,
    NgForOf,
    NgIf,
    TranslocoPipe,
    MatActionList,
    MatCardActions
  ],
  templateUrl: './themes.component.html',
  styleUrl: './themes.component.scss'
})
export class ThemesComponent implements OnInit {

  public topics: Topic[]=[];

  topicsTest: Topic[] = [
    {id: 1, name: 'Topic 1', description: "description", createdAt: new Date(), updatedAt: new Date()},
    {id: 2, name: 'Topic 2', description: "description", createdAt: new Date(), updatedAt: new Date()},
    {id: 3, name: 'Topic 3', description: "description", createdAt: new Date(), updatedAt: new Date()},
    {id: 4, name: 'Topic 4', description: "description", createdAt: new Date(), updatedAt: new Date()},
    {id: 5, name: 'Topic 5', description: "description", createdAt: new Date(), updatedAt: new Date()},
    {id: 6, name: 'Topic 6', description: "description", createdAt: new Date(), updatedAt: new Date()},
];

  constructor(
    private topicService: TopicService,
    private router: Router,
    private toasterService: ToasterService,
  ) {
  }

  ngOnInit(): void {
    this.topicService.getTopics().subscribe({
      next: res => {this.topics = this.topicsTest},
      error: err => {this.toasterService.handleError(err)}
    })
  }

  subscribeToTopic(articleId: number | null) {
    // todo
  }
}
