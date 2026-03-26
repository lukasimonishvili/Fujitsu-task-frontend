import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { signal } from '@angular/core';

@Component({
  selector: 'app-confirm-email',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './confirm-email.html',
})
export class ConfirmEmail implements OnInit {
  loading = signal<boolean>(true);
  success = signal<boolean>(false);
  error = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      this.loading.set(false);
      this.error.set(true);
      return;
    }

    this.authService.confirmEmail(token).subscribe({
      next: (res) => {
        this.success.set(true);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error.set(true);
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }
}
