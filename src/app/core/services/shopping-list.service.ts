import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import {
  AddToShoppingListRequest,
  ShoppingListItem,
} from '../../shared/models/shopping-list.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  addItem(data: AddToShoppingListRequest) {
    return this.http.post(`${this.api.baseUrl}/ShoppingList`, data);
  }

  getAll(): Observable<ShoppingListItem[]> {
    return this.http.get<ShoppingListItem[]>(`${this.api.baseUrl}/ShoppingList`);
  }

  update(productId: number, quantity: number) {
    return this.http.put(`${this.api.baseUrl}/ShoppingList`, { quantity, productId });
  }

  remove(productId: number) {
    return this.http.delete(`${this.api.baseUrl}/ShoppingList/?productId=${productId}`);
  }
}
