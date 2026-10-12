import { Routes } from '@angular/router';

import { Login } from './components/login/login';
import { Cursos } from './components/cursos/cursos';
import { Alumnos } from './components/alumnos/alumnos';
import { Administracion } from './components/administracion/administracion';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: Login
  },

  {
    path: 'cursos',
    component: Cursos,
    canActivate: [authGuard]
  },

  {
    path: 'alumnos',
    component: Alumnos,
    canActivate: [authGuard]
  },

  {
    path: 'administracion',
    component: Administracion,
    canActivate: [authGuard]
  },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];