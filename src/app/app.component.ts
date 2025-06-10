import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { SplashScreen } from '@capacitor/splash-screen';

import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor() {
    
    this.ocultarBarra();

  }
  async ocultarBarra() {
    try {
      await StatusBar.hide();
    } catch (error) {
      console.error('Error al ocultar la barra de estado', error);
    }
  }

}
