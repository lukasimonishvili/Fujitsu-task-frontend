import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/models/product.models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.api.baseUrl}/products`);
  }

  create(product: Omit<Product, 'id'>) {
    return this.http.post(`${this.api.baseUrl}/products`, product);
  }

  update(product: Product) {
    return this.http.put(`${this.api.baseUrl}/products/${product.id}`, product);
  }

  delete(productId: number) {
    return this.http.delete(`${this.api.baseUrl}/products/${productId}`);
  }
}
