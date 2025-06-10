import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.app.visualizacion',
  appName: 'Visualizacion',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,      // Quita el splash automáticamente
      launchAutoHide: true,       // Oculta automáticamente (pero en este caso no dura nada)
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      backgroundColor: '#000000'  // O cualquier color de fondo que quieras
    }
  }
};

export default config;
