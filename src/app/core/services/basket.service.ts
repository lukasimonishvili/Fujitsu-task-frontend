import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { BasketItem } from '../../shared/models/basket.models';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  getBasket(): Observable<BasketItem[]> {
    return this.http.get<BasketItem[]>(`${this.api.baseUrl}/basket`);
  }
}
