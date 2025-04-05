import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvConfig } from '@shcodeblog/core/environment';
import { map, Observable, take } from 'rxjs';
import { Post } from '../../models/post/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

  constructor(@Inject(ENV_CONFIG) private readonly _env: EnvConfig) {}

  getAll(featured: string, category: string, page: number, size: number): Observable<Post[]> {
    return this._httpClient.get<Post[]>(`${this._env.apiUrl}/posts?featured=${featured}&category=${category}&page=${page}&size=${size}`).pipe(
      take(1),
      map((res) => {
        return res
      })
    )
  }

  get(id: string): Observable<Post> {
    return this._httpClient.get<Post>(`${this._env.apiUrl}/posts/${id}`);
  }

  count(): Observable<{ allPosts: number }> {
    return this._httpClient.get<{ allPosts: number }>(`${this._env.apiUrl}/posts/count`);
  }

  like(postId: string): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/posts/like/${postId}`, { content: 'like' }, { withCredentials: true });
  }

  save(postId: string): Observable<unknown> {
    return this._httpClient.post(`${this._env.apiUrl}/posts/save/${postId}`, { content: 'save' }, { withCredentials: true });
  }
}
