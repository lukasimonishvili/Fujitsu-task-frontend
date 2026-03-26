import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Form,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { RegisterRequest } from '../../../shared/models/auth.models';

type RegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {
  errorMessage = '';
  successMessage = '';

  form: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    confirmPassword: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.form = this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
      password: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/),
        ],
        nonNullable: true,
      }),
      confirmPassword: this.fb.control('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  passwordsMatch(): boolean {
    return this.form.value.password === this.form.value.confirmPassword;
  }

  submit() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid || !this.passwordsMatch()) {
      this.form.markAllAsTouched();
      return;
    }

    const request: RegisterRequest = this.form.value as RegisterRequest;

    this.authService.register(request).subscribe({
      next: () => {
        this.successMessage = 'Registration successful. Please check your email.';
        this.form.reset();
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
      },
    });
  }
}
