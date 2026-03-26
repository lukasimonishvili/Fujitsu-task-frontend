import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { LoginRequest, LoginResponse, RegisterRequest } from '../../shared/models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private api: ApiService,
  ) {}

  login(data: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.api.baseUrl}/auth/login`, data);
  }

  register(data: RegisterRequest) {
    return this.http.post(`${this.api.baseUrl}/auth/register`, data);
  }

  confirmEmail(token: string) {
    return this.http.get(`${this.api.baseUrl}/auth/confirm?token=${token}`, {
      responseType: 'text' as const,
    });
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }
}
