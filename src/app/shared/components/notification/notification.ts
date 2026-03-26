import { Component } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.html',
})
export class NotificationComponent {
  constructor(public notificationService: NotificationService) {}
}
