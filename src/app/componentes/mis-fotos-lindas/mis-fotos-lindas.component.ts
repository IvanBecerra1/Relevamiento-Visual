import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { IonContent } from "@ionic/angular/standalone";
import { CardImagenComponent } from '../card-imagen/card-imagen.component';
import { CommonModule, NgIf } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { FotosService } from 'src/app/servicio/fotos.service';

@Component({
  selector: 'app-mis-fotos-lindas',
  templateUrl: './mis-fotos-lindas.component.html',
  styleUrls: ['./mis-fotos-lindas.component.scss'],
  imports: [CardImagenComponent,CommonModule, IonicModule, NgIf],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // <- ¡ESTO ES LO QUE FALTABA!
})
export class MisFotosLindasComponent  implements OnInit {
  usuarioNombre : any ;
  misFotos: any[] = [];
  indiceActual = 0;

  constructor(private router: Router,  private fotoService: FotosService,
    private authService: AutenticacionService) {}

  async ngOnInit() {
    const uid = await this.authService.getCurrentUserIdAsync();
    this.usuarioNombre = this.capitalize( uid?.split('@')[0]);

    if (uid) {
      const todas = await this.fotoService.obtenerFotosPorTipo('linda');
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
    this.router.navigate([`/lindo`]);
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
