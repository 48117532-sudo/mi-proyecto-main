import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatosService } from '../../services/datos.service';
import { Profesor } from '../../models/models';

@Component({
  selector: 'app-administracion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './administracion.html',
  styleUrl: './administracion.css'
})
export class Administracion {

  nombreNuevo = '';

  profesorEditando: Profesor | null = null;

  constructor(public datos: DatosService) {}

  guardarProfesor() {

    if (!this.nombreNuevo.trim()) {
      return;
    }

    if (this.profesorEditando) {

      this.datos.editarProfesor(
        this.profesorEditando.id,
        this.nombreNuevo.trim()
      );

    } else {

      this.datos.agregarProfesor(
        this.nombreNuevo.trim()
      );

    }

    this.limpiarFormulario();
  }

  editarProfesor(profesor: Profesor) {

    this.profesorEditando = profesor;

    this.nombreNuevo = profesor.nombre;
  }

  eliminarProfesor(id: number) {

    this.datos.eliminarProfesor(id);

    if (this.profesorEditando?.id === id) {
      this.limpiarFormulario();
    }
  }

  limpiarFormulario() {

    this.nombreNuevo = '';

    this.profesorEditando = null;
  }
}