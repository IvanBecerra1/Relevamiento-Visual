import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";
import { CardImagenComponent } from '../card-imagen/card-imagen.component';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { FotosService } from 'src/app/servicio/fotos.service';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
@Component({
  selector: 'app-mis-fotos-feas',
  templateUrl: './mis-fotos-feas.component.html',
  styleUrls: ['./mis-fotos-feas.component.scss'],
  imports: [CardImagenComponent,CommonModule, IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // <- ¡ESTO ES LO QUE FALTABA!
})
export class MisFotosFeasComponent  implements OnInit {
  usuarioNombre : any;
  misFotos: any[] = [];
  indiceActual = 0;

  constructor(private router: Router,  private fotoService: FotosService,
    private authService: AutenticacionService) {}

  async ngOnInit() {
    const uid = await this.authService.getCurrentUserIdAsync();
    this.usuarioNombre = uid?.split('@')[0];

    if (uid) {
      const todas = await this.fotoService.obtenerFotosPorTipo('fea');
      this.misFotos = todas
        .filter((foto: any) => foto.uid === uid)
        .map((foto: any) => ({
          usuario: uid,
          urlImagen: foto.url,
          fecha: new Date(foto.fecha?.seconds * 1000).toLocaleDateString(),
          votos: foto.votos ?? 0
        }));
    }
  }
  capitalize(str: any): string {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }


  navegarA(ruta: string) {
    this.router.navigate([`/feo`]);
  }

  get fotoActual() {
    return this.misFotos[this.indiceActual];
  }

  // Variables para el swipe
  inicioX = 0;
  inicioY = 0;

  iniciarSwipe(event: TouchEvent) {
    this.inicioX = event.touches[0].clientX;
    this.inicioY = event.touches[0].clientY;
  }

  terminarSwipe(event: TouchEvent) {
    const finX = event.changedTouches[0].clientX;
    const finY = event.changedTouches[0].clientY;

    const deltaX = finX - this.inicioX;
    const deltaY = finY - this.inicioY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < -50) {
        this.siguiente();
      } else if (deltaX > 50) {
        this.anterior();
      }
    } else {
      if (deltaY < -50) {
        this.volverAlInicio();
      }
    }
  }

  siguiente() {
    if (this.indiceActual < this.misFotos.length - 1) {
      this.indiceActual++;
    }
  }

  anterior() {
    if (this.indiceActual > 0) {
      this.indiceActual--;
    }
  }

  volverAlInicio() {
    this.indiceActual = 0;
  }
}
