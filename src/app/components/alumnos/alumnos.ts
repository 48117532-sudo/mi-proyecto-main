import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import { Alumno } from '../../models/models';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './alumnos.html',
  styleUrl: './alumnos.css'
})
export class Alumnos {

  nombreNuevo = '';

  cursoSeleccionado: number | null = null;

  profesoresSeleccionados: number[] = [];

  alumnoEditando: Alumno | null = null;

  constructor(public datos: DatosService) {}

  guardarAlumno() {

    if (
      !this.nombreNuevo.trim() ||
      this.cursoSeleccionado === null
    ) {
      return;
    }

    if (this.alumnoEditando) {

      this.datos.editarAlumno(
        this.alumnoEditando.id,
        this.nombreNuevo.trim(),
        this.cursoSeleccionado,
        this.profesoresSeleccionados
      );

    } else {

      this.datos.agregarAlumno(
        this.nombreNuevo.trim(),
        this.cursoSeleccionado,
        this.profesoresSeleccionados
      );
    }

    this.limpiarFormulario();
  }

  editarAlumno(alumno: Alumno) {

    this.alumnoEditando = alumno;

    this.nombreNuevo = alumno.nombre;

    this.cursoSeleccionado = alumno.cursoId;

    this.profesoresSeleccionados = [
      ...alumno.profesorIds
    ];
  }

  eliminarAlumno(id: number) {

    this.datos.eliminarAlumno(id);

    if (this.alumnoEditando?.id === id) {
      this.limpiarFormulario();
    }
  }

  seleccionarProfesor(id: number, event: Event) {

    const checkbox = event.target as HTMLInputElement;

    if (checkbox.checked) {

      if (!this.profesoresSeleccionados.includes(id)) {

        this.profesoresSeleccionados = [
          ...this.profesoresSeleccionados,
          id
        ];
      }

    } else {

      this.profesoresSeleccionados =
        this.profesoresSeleccionados.filter(
          profesorId => profesorId !== id
        );
    }
  }

  tieneProfesor(id: number): boolean {

    return this.profesoresSeleccionados.includes(id);
  }

  limpiarFormulario() {

    this.nombreNuevo = '';

    this.cursoSeleccionado = null;

    this.profesoresSeleccionados = [];

    this.alumnoEditando = null;
  }
}