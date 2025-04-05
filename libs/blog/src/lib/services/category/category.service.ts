import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { ENV_CONFIG, EnvConfig } from '@shcodeblog/core/environment';
import { Observable } from 'rxjs';
import { Category } from '../../models/category/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private readonly _httpClient: HttpClient = inject(HttpClient);

  constructor(@Inject(ENV_CONFIG) private readonly _env: EnvConfig) {}

  getAll(): Observable<Category[]> {
    return this._httpClient.get<Category[]>(`${this._env.apiUrl}/categories`);
  }
}
