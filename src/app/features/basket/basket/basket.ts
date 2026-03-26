import { Component, OnInit, signal, computed } from '@angular/core';
import { BasketService } from '../../../core/services/basket.service';
import { BasketItem } from '../../../shared/models/basket.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './basket.html',
})
export class Basket implements OnInit {
  items = signal<BasketItem[]>([]);
  loading = signal(true);

  constructor(private service: BasketService) {}

  ngOnInit(): void {
    this.service.getBasket().subscribe({
      next: (res) => {
        this.items.set(res);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  totalWeight = computed(() =>
    this.items().reduce((sum, item) => sum + item.weight * item.quantity, 0),
  );
}
