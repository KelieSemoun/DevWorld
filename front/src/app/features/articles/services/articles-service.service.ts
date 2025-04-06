import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateArticleRequest } from '../interfaces/CreateArticleRequest.interface';
import { ArticleFeed } from '../interfaces/ArticleFeed.interface';

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
}
