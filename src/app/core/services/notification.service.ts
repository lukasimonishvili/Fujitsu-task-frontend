import { Injectable, signal } from '@angular/core';

export interface Notification {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification = signal<Notification | null>(null);

  showSuccess(message: string) {
    this.notification.set({ message, type: 'success' });

    setTimeout(() => this.clear(), 3000);
  }

  showError(message: string) {
    this.notification.set({ message, type: 'error' });

    setTimeout(() => this.clear(), 3000);
  }

  clear() {
    this.notification.set(null);
  }
}
