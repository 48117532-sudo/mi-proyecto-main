export interface Curso {
  id: number;
  nombre: string;
}

export interface Profesor {
  id: number;
  nombre: string;
}

export interface Alumno {
  id: number;
  nombre: string;
  cursoId: number;
  profesorIds: number[];
}

export interface User {
  id?: string;
  nombre: string;
  apellido: string;
  email: string;
}