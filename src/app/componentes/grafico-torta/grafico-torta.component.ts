import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { IonButton, IonButtons, IonFooter, IonToolbar, IonContent, IonHeader, IonTitle, IonModal } from "@ionic/angular/standalone";
import { Router } from '@angular/router';
import { FotosService } from 'src/app/servicio/fotos.service';
import { CommonModule, NgIf } from '@angular/common';
import { CardImagenComponent } from '../card-imagen/card-imagen.component';

@Component({
  selector: 'app-grafico-torta',
  standalone: true,
  templateUrl: './grafico-torta.component.html',
  styleUrls: ['./grafico-torta.component.scss'],
  imports: [IonModal, NgIf, CommonModule, CardImagenComponent, IonTitle, IonHeader, IonContent, IonToolbar, IonFooter, IonButtons, IonButton, NgChartsModule],
})
export class GraficoTortaComponent implements OnInit {
  fotos: any[] = [];
  fotoSeleccionada: any = null;

  constructor(private router: Router, private fotoService: FotosService) {}

  data: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#4caf50', '#f44336', '#81c784', '#03a9f4', '#ff9800'],
      borderWidth: 1
    }]
  };

  options: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    cutout: '60%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      }
    }
  };
  async ionViewWillEnter() {
    
    this.fotoSeleccionada = null;
    const fotos = await this.fotoService.obtenerFotosPorTipo('linda');
    this.fotos = fotos;

    this.data = {
      labels: fotos.map((f: any, i: number) => `Foto ${i + 1} (${f.votos ?? 0})`),
      datasets: [{
        data: fotos.map((f: any) => f.votos ?? 0),
        backgroundColor: ['#4caf50', '#f44336', '#81c784', '#03a9f4', '#ff9800'],
        borderWidth: 1
      }]
    };
  }
  async ngOnInit() {
    const fotos = await this.fotoService.obtenerFotosPorTipo('linda');
    this.fotos = fotos;

    this.data = {
      labels: fotos.map((f: any, i: number) => `Foto ${i + 1} (${f.votos ?? 0})`),
      datasets: [{
        data: fotos.map((f: any) => f.votos ?? 0),
        backgroundColor: ['#4caf50', '#f44336', '#81c784', '#03a9f4', '#ff9800'],
        borderWidth: 1
      }]
    };
  }

  onChartClick(event: any) {
    const index = event.active?.[0]?.index;
    if (index === undefined) return;

    this.fotoSeleccionada = this.fotos[index];
  }

  cerrarSeleccion() {
    this.fotoSeleccionada = null;
  }

  navegarA(ruta: string) {
    this.router.navigate([`/${ruta}`]);
  }

  fechaFormateada(fecha: any): string {
    if (!fecha?.seconds) return '';
    const date = new Date(fecha.seconds * 1000);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }
}
