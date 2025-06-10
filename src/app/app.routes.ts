import { Routes } from '@angular/router';
import { RegistroComponent } from './componentes/registro/registro.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { SplashComponent } from './componentes/splash/splash.component';
import { EdificioLindoComponent } from './componentes/edificio-lindo/edificio-lindo.component';
import { EdificioFeoComponent } from './componentes/edificio-feo/edificio-feo.component';
import { GraficoTortaComponent } from './componentes/grafico-torta/grafico-torta.component';
import { GraficoBarrasComponent } from './componentes/grafico-barras/grafico-barras.component';
import { SubirFotoComponent } from './componentes/subir-foto/subir-foto.component';
import { splitNsName } from '@angular/compiler';
import { MisFotosLindasComponent } from './componentes/mis-fotos-lindas/mis-fotos-lindas.component';
import { MisFotosFeasComponent } from './componentes/mis-fotos-feas/mis-fotos-feas.component';

export const routes: Routes = [
  {
    path: '',
    component: SplashComponent
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'grafico-torta',
    component: GraficoTortaComponent
  },
  {
    path: 'grafico-barra',
    component: GraficoBarrasComponent
  },
  {
    path: 'iniciar-sesion',
    component: IniciarSesionComponent
  },
  {
    path: 'galeria',
    component: MisFotosLindasComponent
  },
  {
    path: 'lindo',
    component:EdificioLindoComponent
   // loadChildren: () => import('./componentes/tab-lindo/lindo-router').then(m => m.routes)
  },
  {
    path: 'galeriaFeo',
    component:MisFotosFeasComponent
   // loadChildren: () => import('./componentes/tab-lindo/lindo-router').then(m => m.routes)
  },
  {
    path: 'camara',
    component:SubirFotoComponent
   // loadChildren: () => import('./componentes/tab-lindo/lindo-router').then(m => m.routes)
  },
  {
    path: 'feo',
    component: EdificioFeoComponent
  }
];
