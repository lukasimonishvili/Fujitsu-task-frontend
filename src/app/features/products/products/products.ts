import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../shared/models/product.models';
import { ProductService } from '../../../core/services/prouct.service';
import { signal } from '@angular/core';
import { ShoppingListService } from '../../../core/services/shopping-list.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
})
export class Products implements OnInit {
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);

  constructor(
    private productService: ProductService,
    private shoppingListService: ShoppingListService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  addToList(productId: number) {
    this.shoppingListService
      .addItem({
        productId,
        quantity: 1,
      })
      .subscribe({
        next: () => {
          this.notificationService.showSuccess('Product added to shopping list');
        },
        error: () => {
          this.notificationService.showError('Failed to add product');
        },
      });
  }
}
