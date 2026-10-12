import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';
  error = '';
  cargando = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  iniciarSesion() {

    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Completa usuario y contraseña';
      return;
    }

    this.error = '';
    this.cargando = true;

    this.auth.login(
      this.username.trim(),
      this.password
    ).subscribe({
      next: () => {
        this.cargando = false;
        this.router.navigate(['/cursos']);
      },

      error: () => {
        this.cargando = false;
        this.error = 'Usuario o contraseña incorrectos';
      }
    });
  }
}