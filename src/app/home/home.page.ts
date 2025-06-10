import { Component, inject } from '@angular/core';
import { ToastController,IonHeader, IonToolbar, IonTitle, IonContent, IonInput, IonButton, IonFab, IonFabButton, IonIcon } from '@ionic/angular/standalone';
import { AutenticacionService } from '../servicio/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonIcon, IonFabButton, IonFab, IonButton, IonInput, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  private autenticacion : AutenticacionService = inject(AutenticacionService);
  private router: Router = inject(Router);

  private toastCtrl: ToastController = inject(ToastController);
  constructor() {}


  login(){
    
  }
  async mostrarToast(mensaje: string, color: 'success' | 'danger' = 'danger') {
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
      await this.autenticacion.cerrarSesion();
      
      this.mostrarToast('Sesión cerrada!', 'success');
      this.router.navigate(["/iniciar-sesion"]);
    } catch(error){
      console.log("error: " + error);
    }
  }
  edificioLindo(){
    this.router.navigate(["/lindo"])
  }
  edificioFeo(){
    this.router.navigate(["/feo"])

  }
}
