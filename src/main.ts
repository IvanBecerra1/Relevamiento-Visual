/*import { bootstrapApplication } from '@angular/platform-browser';


import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';  // Agregar Firebase Storage

import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({ player: () => player }),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Inicializar Firebase
    provideFirebaseApp(() => initializeApp({ 
      projectId: "pps-login-01",
      appId: "1:736484906096:web:d97909bed3bddd27d7d0b5",
      storageBucket: "//pps-login-01.firebasestorage.app", 
      apiKey: "AIzaSyDq7uksApRvscfKKegMUZGtdX1XwR9-IoY",
      authDomain: "pps-login-01.firebaseapp.com",
      messagingSenderId: "736484906096"
    })),
    
    // Proveer los servicios de Firebase
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()), provideFirebaseApp(() => initializeApp({ projectId: "pps-login-01", appId: "1:736484906096:web:d97909bed3bddd27d7d0b5", storageBucket: "pps-login-01.firebasestorage.app", apiKey: "AIzaSyDq7uksApRvscfKKegMUZGtdX1XwR9-IoY", authDomain: "pps-login-01.firebaseapp.com", messagingSenderId: "736484906096" })), provideStorage(() => getStorage()),  // Proveer Firebase Storage
  ],
});*/

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideLottieOptions } from 'ngx-lottie';
import player from 'lottie-web';

// Configuración centralizada de Firebase
const firebaseConfig = {
  projectId: "pps-login-01",
  appId: "1:736484906096:web:d97909bed3bddd27d7d0b5",
  storageBucket: "pps-login-01.firebasestorage.app", //"pps-login-01.appspot.com", // Cambiado a .appspot.com
  apiKey: "AIzaSyDq7uksApRvscfKKegMUZGtdX1XwR9-IoY",
  authDomain: "pps-login-01.firebaseapp.com",
  messagingSenderId: "736484906096"
};

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideLottieOptions({ player: () => player }),
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    
    // Firebase (INICIALIZACIÓN ÚNICA)
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()) // Solo una vez
  ],
}).catch(err => console.error(err));