import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { UserService } from '../../services/user.service';
import { Curso } from '../../models/models';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos implements OnInit {

  nombreNuevo = '';

  cursos: Curso[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.listarCursos();
  }

  listarCursos(): void {

    this.userService.cursos().subscribe({

      next: (cursos) => {
        this.cursos = cursos;
      },

      error: (error) => {
        console.error('Error al obtener cursos:', error);
      }

    });

  }

  agregar(): void {

    if (!this.nombreNuevo.trim()) {
      return;
    }

    const curso = {
      nombre: this.nombreNuevo.trim()
    };

    this.userService.crearCurso(curso).subscribe({

      next: () => {

        this.nombreNuevo = '';

        this.listarCursos();

      },

      error: (error) => {
        console.error('Error al guardar curso:', error);
      }

    });

  }

}