import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../services/articles-service.service';
import { ArticleFeed } from '../../interfaces/ArticleFeed.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  articles: ArticleFeed[] = [];

  constructor(private articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.articlesService.getFeed().subscribe(data => {
      this.articles = data;
    });
  }

  goToArticle(id: number): void {
    this.router.navigate(['/articles', id]);
  }

  createArticle(): void {
    this.router.navigate(['/articles/create']);
  }
}
