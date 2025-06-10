import { Component } from '@angular/core';
import { FotosService } from 'src/app/servicio/fotos.service';
import { IonContent, IonButton, IonInput } from "@ionic/angular/standalone";
import { FormsModule } from '@angular/forms';
import { AlertController } from '@ionic/angular/standalone'; // ¡Cambiado a standalone!

@Component({
  selector: 'app-subir-foto',
  templateUrl: './subir-foto.component.html',
  styleUrls: ['./subir-foto.component.scss'],
  standalone: true, // Asegúrate de que está marcado como standalone
  imports: [
    IonContent, 
    IonButton,
    IonInput,
    FormsModule
  ]
})
export class SubirFotoComponent {
  selectedFile: File | null = null;
  isUploading = false;
  downloadUrl: string | null = null;

  constructor(
    private storageService: FotosService,
    private alertController: AlertController,
    private fotoService: FotosService
  ) {}


  subirLinda() {
    this.fotoService.tomarYSubirFoto('linda');
  }

  subirFea() {
    this.fotoService.tomarYSubirFoto('fea');
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    this.downloadUrl = null;
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }
}