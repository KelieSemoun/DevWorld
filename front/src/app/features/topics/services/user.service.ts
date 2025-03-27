import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'api/user';

  constructor(private http: HttpClient) {}

  subscribe(userId: number, topicId: number): Observable<void> {
    console.log(`${this.baseUrl}/${userId}/subscribe/${topicId}`);
    return this.http.post<void>(`${this.baseUrl}/${userId}/subscribe/${topicId}`, {}, {
      withCredentials: true
    });
  }
}