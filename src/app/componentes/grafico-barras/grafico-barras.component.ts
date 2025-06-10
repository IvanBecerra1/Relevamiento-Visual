import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { IonHeader, IonToolbar, IonContent, IonFooter, IonButtons, IonButton, IonTitle, IonCard, IonCardHeader, IonCardContent, IonImg, IonCardSubtitle, IonText, IonCardTitle, IonAvatar, IonItem, IonLabel, IonRow } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FotosService } from 'src/app/servicio/fotos.service';
import { CardImagenComponent } from '../card-imagen/card-imagen.component';
import { CommonModule, NgIf } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-grafico-barras',
  imports: [NgChartsModule, CommonModule, NgIf, CardImagenComponent, IonTitle, IonButton, IonButtons, IonFooter, IonContent, IonToolbar, IonHeader],
  templateUrl: './grafico-barras.component.html',
  styleUrls: ['./grafico-barras.component.scss'],
})
export class GraficoBarrasComponent implements OnInit  {
  fotos: any[] = [];
  fotoSeleccionada: any = null;

  constructor(private router: Router, private fotoService: FotosService, 
    private cd: ChangeDetectorRef) {

    this.handleChartClick = this.handleChartClick.bind(this);
  }

  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
  responsive: true,
  animation: { duration: 0 },
  plugins: {
    legend: {
      display: true,
      labels: {
        color: '#fff',
        font: {
          size: 16  // Tamaño de la leyenda
        }
      }
    },
    tooltip: {
      bodyFont: {
        size: 16  // Tamaño del texto en el tooltip
      },
      titleFont: {
        size: 18  // Tamaño del título en el tooltip
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: '#fff',
        font: {
          size: 14 // Tamaño del texto en eje X
        }
      }
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#fff',
        font: {
          size: 14 // Tamaño del texto en eje Y
        }
      }
    }
  }
};
  ionViewWillEnter(): void {
    this.fotoService.obtenerFotosPorTipo('fea').then(fotos => {
      this.fotos = fotos;
      this.barChartData = {
        labels: fotos.map((_, i) => `Foto ${i + 1}`),
        datasets: [{
          label: 'Lo más votado de cosas feas',
          data: fotos.map((f: any) => f.votos ?? 0),
          backgroundColor: '#f44336'
        }]
      };
      this.cd.detectChanges();
    });
  }
  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { fotos: any[] };
  
    if (state?.fotos?.length) {
      this.fotos = state.fotos;
  
      this.barChartData = {
        labels: this.fotos.map((_, i) => `Foto ${i + 1}`),
        datasets: [{
          label: 'Lo más votado de cosas feas',
          data: this.fotos.map(f => f.votos ?? 0),
          backgroundColor: '#f44336'
        }]
      };
    } else {
      // Fallback si no se pasaron fotos
      this.fotoService.obtenerFotosPorTipo('fea').then(fotos => {
        this.fotos = fotos;
        this.barChartData = {
          labels: fotos.map((_ : any, i) => `Foto ${i + 1}`),
          datasets: [{
            label: 'Lo más votado de cosas feas',
            data: fotos.map((f : any) => f.votos ?? 0),
            backgroundColor: '#f44336'
          }]
        };
      });
    }
    this.barChartOptions!.onClick = (event: any, elements: any[]) => {
      if (!elements?.length) return;
      const index = elements[0].index;
      if (index !== undefined && this.fotos[index]) {
        this.fotoSeleccionada = this.fotos[index];
        console.log('🖼 Foto seleccionada:', this.fotoSeleccionada); // <- este debería ejecutarse
        this.cd.detectChanges();
      }
    };
  }
  handleChartClick(event: any, elements: any[]) {
    if (!elements || elements.length === 0) return;
  
    const index = elements[0].index;
    if (index === undefined || !this.fotos[index]) return;
  
    this.fotoSeleccionada = this.fotos[index];
  }
  cerrarSeleccion() {
    this.fotoSeleccionada = null;
    this.cd.detectChanges();

  }

  navegarA(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }

  fechaFormateada(fecha: any): string {
    if (!fecha?.seconds) return '';
    const date = new Date(fecha.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  getNombreUsuario(uid: string | undefined): string {
    if (!uid) return 'Usuario desconocido';
    return uid.includes('@') ? uid.split('@')[0] : uid;
  }
}
