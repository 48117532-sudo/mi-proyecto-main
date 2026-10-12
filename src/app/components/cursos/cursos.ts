import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import { Curso } from '../../models/models';

@Component({
  selector: 'app-cursos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cursos.html',
  styleUrl: './cursos.css'
})
export class Cursos {

  nombreNuevo = '';

  cursoEditando: Curso | null = null;

  constructor(public datos: DatosService) {}

  guardarCurso() {

    if (!this.nombreNuevo.trim()) {
      return;
    }

    if (this.cursoEditando) {

      this.datos.editarCurso(
        this.cursoEditando.id,
        this.nombreNuevo.trim()
      );

    } else {

      this.datos.agregarCurso(
        this.nombreNuevo.trim()
      );
    }

    this.limpiarFormulario();
  }

  editarCurso(curso: Curso) {

    this.cursoEditando = curso;

    this.nombreNuevo = curso.nombre;
  }

  eliminarCurso(id: number) {

    this.datos.eliminarCurso(id);

    if (this.cursoEditando?.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {

    this.nombreNuevo = '';

    this.cursoEditando = null;
  }
}