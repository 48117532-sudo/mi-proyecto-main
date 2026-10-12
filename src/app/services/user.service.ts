import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso, Profesor, Alumno } from '../models/models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL_RESOURCE =
    'https://usuarios-b0d9d-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) {}

  cursos() {
    return this.http
      .get<any>(`${this.URL_RESOURCE}/cursos.json`)
      .pipe(
        map(obj => this.crearArreglo<Curso>(obj))
      );
  }

  crearCurso(curso: Curso) {
    return this.http.post(
      `${this.URL_RESOURCE}/cursos.json`,
      curso
    );
  }

  profesores() {
    return this.http
      .get<any>(`${this.URL_RESOURCE}/profesores.json`)
      .pipe(
        map(obj => this.crearArreglo<Profesor>(obj))
      );
  }

  crearProfesor(profesor: Profesor) {
    return this.http.post(
      `${this.URL_RESOURCE}/profesores.json`,
      profesor
    );
  }

  alumnos() {
    return this.http
      .get<any>(`${this.URL_RESOURCE}/alumnos.json`)
      .pipe(
        map(obj => this.crearArreglo<Alumno>(obj))
      );
  }

  crearAlumno(alumno: Alumno) {
    return this.http.post(
      `${this.URL_RESOURCE}/alumnos.json`,
      alumno
    );
  }

  private crearArreglo<T>(obj: any): T[] {

    if (obj === null) {
      return [];
    }

    return Object.values(obj) as T[];
  }
}