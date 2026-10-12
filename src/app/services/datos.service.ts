import { Injectable, signal } from '@angular/core';
import { Alumno, Curso, Profesor } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  cursos = signal<Curso[]>([]);
  profesores = signal<Profesor[]>([]);
  alumnos = signal<Alumno[]>([]);

  private nextId(list: { id: number }[]): number {
    return list.length
      ? Math.max(...list.map(i => i.id)) + 1
      : 1;
  }

  agregarCurso(nombre: string) {

    const curso: Curso = {
      id: this.nextId(this.cursos()),
      nombre
    };

    this.cursos.update(list => [
      ...list,
      curso
    ]);
  }

  editarCurso(id: number, nombre: string) {

    this.cursos.update(list =>
      list.map(curso =>
        curso.id === id
          ? { ...curso, nombre }
          : curso
      )
    );
  }

  eliminarCurso(id: number) {

    this.cursos.set(
      this.cursos().filter(curso => curso.id !== id)
    );
  }

  agregarProfesor(nombre: string) {

    const profesor: Profesor = {
      id: this.nextId(this.profesores()),
      nombre
    };

    this.profesores.update(list => [
      ...list,
      profesor
    ]);
  }

  editarProfesor(id: number, nombre: string) {

    this.profesores.update(list =>
      list.map(profesor =>
        profesor.id === id
          ? { ...profesor, nombre }
          : profesor
      )
    );
  }

  eliminarProfesor(id: number) {

    this.profesores.set(
      this.profesores().filter(
        profesor => profesor.id !== id
      )
    );
  }

  agregarAlumno(
    nombre: string,
    cursoId: number,
    profesorIds: number[]
  ) {

    const alumno: Alumno = {
      id: this.nextId(this.alumnos()),
      nombre,
      cursoId,
      profesorIds
    };

    this.alumnos.update(list => [
      ...list,
      alumno
    ]);
  }

  editarAlumno(
    id: number,
    nombre: string,
    cursoId: number,
    profesorIds: number[]
  ) {

    this.alumnos.update(list =>
      list.map(alumno =>
        alumno.id === id
          ? {
              ...alumno,
              nombre,
              cursoId,
              profesorIds
            }
          : alumno
      )
    );
  }

  eliminarAlumno(id: number) {

    this.alumnos.set(
      this.alumnos().filter(
        alumno => alumno.id !== id
      )
    );
  }

  nombreCurso(id: number): string {

    return this.cursos()
      .find(curso => curso.id === id)
      ?.nombre ?? '-';
  }

  nombreProfesores(ids: number[]): string {

    if (!ids.length) {
      return '-';
    }

    return this.profesores()
      .filter(profesor => ids.includes(profesor.id))
      .map(profesor => profesor.nombre)
      .join(', ');
  }
}