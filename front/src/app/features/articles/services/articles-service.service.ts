import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateArticleRequest } from '../interfaces/CreateArticleRequest.interface';
import { ArticleFeed } from '../interfaces/ArticleFeed.interface';
import { ArticleDetails } from '../interfaces/ArticleDetails.interface';
import { ArticleComment } from '../interfaces/ArticleComment';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private pathService = '/api/article';

  constructor(private http: HttpClient) {}

  create(data: CreateArticleRequest): Observable<void> {
    return this.http.post<void>(`${this.pathService}`, data);
  }

  getFeed(): Observable<ArticleFeed[]> {
    return this.http.get<ArticleFeed[]>(`${this.pathService}/feed`);
  }

  getById(id: number):  Observable<ArticleDetails>{
    return this.http.get<ArticleDetails>(`${this.pathService}/${id}`);
  }

  getComments(articleId: number): Observable<ArticleComment[]> {
    return this.http.get<ArticleComment[]>(`${this.pathService}/${articleId}/comments`);
  }

  postComment(articleId: number, content: string): Observable<any> {
    return this.http.post('/api/comments', {
      articleId,
      content
    });
  }
  
}
