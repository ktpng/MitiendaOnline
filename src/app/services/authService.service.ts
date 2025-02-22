import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

interface User {
  email: string;
  password: string;
  token: string;
  city: string;
  name: string;
}

const USERS_MOCK: User[] = [
  {
    email: 'usuario@ejemplo.com',
    password: '123456',
    token: 'token-123-abc',
    city: 'Madrid',
    name: 'Usuario Demo',
  },
  {
    email: 'admin@sdi.com',
    password: 'admin123',
    token: 'token-456-xyz',
    city: 'Madrid',
    name: 'Administrador SDI',
  },
  {
    email: 'yesenia@sdi.com',
    password: '123456',
    token: 'token-789-def',
    city: 'Logroño',
    name: 'Usuario Logroño',
  },
];

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  private readonly router = inject(Router);

  constructor() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<any> {
    const user = USERS_MOCK.find(
      (u) => u.email === email && u.password === password
    );

    return new Observable((observer) => {
      if (user) {
        localStorage.setItem('token', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        observer.next({
          success: true,
        });
      } else {
        observer.error({ message: 'Credenciales inválidas' });
      }
      observer.complete();
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAdminUser(): boolean {
    const user = this.userSubject.value;
    return user?.email?.endsWith('@sdi.com') || false;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getCurrentUser(): User | null {
    return this.userSubject.value;
  }
}
