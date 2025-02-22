import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  username = '';
  password = '';
  errorMessage = '';

  constructor() {}

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/']),
      error: () => (this.errorMessage = 'Usuario o contraseña incorrectos'),
    });
  }
}
