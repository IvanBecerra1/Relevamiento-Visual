import { Component, inject, OnInit } from '@angular/core';
import { IonTabButton, IonIcon, ToastController, IonHeader, IonTabs, IonTab, IonToolbar, IonTitle, IonContent, IonTabBar, IonLabel, IonBadge, IonSegmentButton, IonSegment, IonAvatar, IonItem, IonCard, IonRow, IonText, IonButton, IonButtons, IonFooter, IonImg } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';

import { library, playCircle, radio, search } from 'ionicons/icons';
import { GraficoTortaComponent } from "../grafico-torta/grafico-torta.component";
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { GraficoBarrasComponent } from '../grafico-barras/grafico-barras.component';
import { CardImagenComponent } from "../card-imagen/card-imagen.component";
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { FotosService } from 'src/app/servicio/fotos.service';
import { StatusBar, Style } from '@capacitor/status-bar';

@Component({
  selector: 'app-edificio-lindo',
  templateUrl: './edificio-lindo.component.html',
  styleUrls: ['./edificio-lindo.component.scss'], 
  imports: [IonImg, IonContent, IonHeader, CommonModule, IonButton, IonIcon,
    IonTitle, IonToolbar, NgChartsModule, CardImagenComponent, IonFooter, IonButtons],
})
export class EdificioLindoComponent  implements OnInit {
  private router = inject(Router);
  imagen : any;
  private autenticacion : AutenticacionService = inject(AutenticacionService);
  private fotoService : FotosService = inject(FotosService);

  private toastCtrl: ToastController = inject(ToastController);
  fotosLindas: any[] = [];

  verGrafico = false;
  constructor() {
    addIcons({ library, playCircle, radio, search }); }

 
    async ngOnInit() {
      await this.cargarFotos();
    }

    async cargarFotos() {
      const fotos = await this.fotoService.obtenerFotosPorTipo('linda');
    
      this.fotosLindas = await Promise.all(
        fotos.map(async (foto: any) => {
          const yaVotado = await this.fotoService.usuarioYaVoto(foto.id);


          return {
            id: foto.id,
            usuario: foto.uid,
            urlImagen: foto.url,
            fecha: foto.fecha,
            votos: foto.votos ?? 0,
            yaVotado: yaVotado
          };
        })
      );
    }
    
    
  toggleGrafico(): void {
    this.verGrafico = !this.verGrafico;
    console.log("TOGLE : " , this.verGrafico)
  }
 
  fechaFormateada(fecha: any): string {
    if (!fecha?.seconds) return '';
    const date = new Date(fecha.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
  redireccionar(text : string) {
    
    this.router.navigate([text]);
  }
  
async subirLinda() {
  const subidaExitosa = await this.fotoService.tomarYSubirFoto('linda');
  if (subidaExitosa) {
    await this.cargarFotos(); // actualiza el feed
  }
} async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'danger') {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2500,
      position: 'middle',
      color: color,
    });
    await toast.present();
  }
  async desconectarse(){
    try{
      console.log("test");
      
      this.mostrarToast('Sesión cerrada!', 'success');
      await this.autenticacion.cerrarSesion();
      this.router.navigate(["/iniciar-sesion"]);
    } catch(error){
      console.log("error: " + error);
    }
  }
}
