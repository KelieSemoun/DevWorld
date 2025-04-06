import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticlesService } from '../../services/articles-service.service';
import { ArticleDetails } from '../../interfaces/ArticleDetails.interface';
import { ArticleComment } from '../../interfaces/ArticleComment';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.scss']
})
export class ArticleDetailsComponent implements OnInit {
  article?: ArticleDetails; // create ArticleDetails interface if needed
  commentForm!: FormGroup;
  comments: ArticleComment[] = [];

  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = +this.route.snapshot.paramMap.get('id')!;
    this.articlesService.getById(articleId).subscribe(article => {
      this.article = article;
      console.log(this.article);
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
    if (this.commentForm.valid) {
      const content = this.commentForm.value.content;
      // Implement post comment later
      console.log('Posting comment:', content);
      this.commentForm.reset();
    }
  }
}
