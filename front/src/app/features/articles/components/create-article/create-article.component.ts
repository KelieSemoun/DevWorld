import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Topic } from 'src/app/features/topics/interfaces/topic.interface';
import { TopicApiService } from 'src/app/features/topics/services/topic-api.service';
import { ArticlesService } from '../../services/articles-service.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {

  articleForm!: FormGroup;
  topics :Topic[] = [];

  constructor(private fb: FormBuilder,
              private topicApiService: TopicApiService,
              private articlesService: ArticlesService,
              private snackBar: MatSnackBar,
              private router: Router) {}

  ngOnInit(): void {
    this.articleForm = this.fb.group({
      topicId: [null, Validators.required],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });

    this.topicApiService.all().subscribe(topics => this.topics = topics);
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  create(): void {
    if (this.articleForm.invalid) return;

    const request = this.articleForm.value;
    
    this.articlesService.create(request).subscribe({
      next: () => {
        this.snackBar.open('Article créé avec succès', 'Fermer', { duration: 3000 });
        this.router.navigate(['/articles']);
      },
      error: () => {
        this.snackBar.open("Échec de la création de l'article", 'Fermer', { duration: 3000 });
      }
    });
  }
}