// src/app/services/auth.service.ts
import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  currentUser = signal<any>(null);

  isAdmin = computed(() => {
    return this.currentUser()?.admin === 1;
  });

  isLoggedIn = computed(() => !!this.currentUser());

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.initializeAuth();
  }

  private initializeAuth() {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (token && savedUser) {
      try {
        this.currentUser.set(JSON.parse(savedUser));
      } catch (e) {
        this.logout();
      }
    } else if (!token) {
      this.logout();
    }
  }

  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(credentials: any) {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          this.currentUser.set(response.user);
        }
      }),
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser.set(null);
    this.router.navigate(['/login']);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
