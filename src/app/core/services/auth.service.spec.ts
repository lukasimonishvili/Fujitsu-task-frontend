import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { ApiService } from './api.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockApi = {
    baseUrl: 'http://test-api',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, { provide: ApiService, useValue: mockApi }],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call login endpoint', () => {
    const mockData = { email: 'test@test.com', password: '123456' };

    service.login(mockData).subscribe();

    const req = httpMock.expectOne('http://test-api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'abc' });
  });

  it('should store token', () => {
    service.setToken('abc');

    expect(localStorage.getItem('auth_token')).toBe('abc');
  });

  it('should return token', () => {
    localStorage.setItem('auth_token', 'abc');

    expect(service.getToken()).toBe('abc');
  });

  it('should return true when authenticated', () => {
    localStorage.setItem('auth_token', 'abc');

    expect(service.isAuthenticated()).toBe(true);
  });

  it('should return false when not authenticated', () => {
    expect(service.isAuthenticated()).toBe(false);
  });

  it('should remove token on logout', () => {
    localStorage.setItem('auth_token', 'abc');

    service.logout();

    expect(localStorage.getItem('auth_token')).toBeNull();
  });
});
