import { Component, OnInit, signal } from '@angular/core';
import { ShoppingListService } from '../../../core/services/shopping-list.service';
import { ShoppingListItem } from '../../../shared/models/shopping-list.models';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shopping-list.html',
})
export class ShoppingList implements OnInit {
  items = signal<ShoppingListItem[]>([]);
  loading = signal(true);

  constructor(
    private service: ShoppingListService,
    private notification: NotificationService,
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe({
      next: (res) => {
        this.items.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  update(item: ShoppingListItem, quantity: number) {
    if (quantity < 0) return;

    this.service.update(item.productId, quantity).subscribe({
      next: () => {
        this.notification.showSuccess('Updated');
        this.load();
      },
      error: () => {
        this.notification.showError('Update failed');
      },
    });
  }

  remove(productId: number) {
    this.service.remove(productId).subscribe({
      next: () => {
        this.notification.showSuccess('Removed');
        this.load();
      },
      error: () => {
        this.notification.showError('Remove failed');
      },
    });
  }
}
