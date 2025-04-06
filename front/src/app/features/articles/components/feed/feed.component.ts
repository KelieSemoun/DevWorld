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
  sortOrder: 'desc' | 'asc' = 'desc';

  constructor(private articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.articlesService.getFeed().subscribe(data => {
      this.articles = this.sortArticles(data);
    });
  }
  sortArticles(articles: ArticleFeed[]): ArticleFeed[] {
    return articles.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return this.sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }

  toggleSortOrder(): void {
    this.sortOrder = this.sortOrder === 'desc' ? 'asc' : 'desc';
    this.articles = this.sortArticles([...this.articles]);
  }

  goToArticle(id: number): void {
    this.router.navigate(['/articles', id]);
  }

  createArticle(): void {
    this.router.navigate(['/articles/create']);
  }
}
