import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles-service.service';
import { ArticleDetails } from '../../interfaces/ArticleDetails.interface';
import { ArticleComment } from '../../interfaces/ArticleComment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article?: ArticleDetails;
  commentForm!: FormGroup;
  comments: ArticleComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.articlesService.getById(articleId).subscribe(article => {
      this.article = article;
    });

    this.articlesService.getComments(articleId).subscribe(comments => {
      this.comments = comments;
    });

    this.commentForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  goBack(): void {
    this.router.navigate(['/articles']);
  }

  sendComment(): void {
    if (this.commentForm.invalid || !this.article) return;
  
    const content = this.commentForm.value.content;
  
    this.articlesService.postComment(this.article.id, content).subscribe({
      next: () => {
        this.commentForm.reset();
        this.articlesService.getComments(this.article!.id).subscribe(comments => {
          this.comments = comments;
        });
      },
      error: () => {
        this.snackBar.open("Échec de la création du commentaire", 'Fermer', { duration: 3000 });
      }
    });
  }
  
}
