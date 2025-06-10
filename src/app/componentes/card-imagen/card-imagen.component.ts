import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonTabButton, IonIcon, IonHeader, IonTabs, IonTab, IonToolbar, IonTitle, IonContent, IonTabBar, IonLabel, IonBadge, IonSegmentButton, IonSegment, IonAvatar, IonItem, IonCard, IonRow, IonText, IonButton, IonButtons, IonFooter } from "@ionic/angular/standalone";
import { FotosService } from 'src/app/servicio/fotos.service';
import { heart, heartOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'app-card-imagen',
  templateUrl: './card-imagen.component.html',
  styleUrls: ['./card-imagen.component.scss'],imports: [ IonButton, IonRow, IonIcon, IonCard,IonContent, IonHeader,CommonModule,
    IonTitle, IonText, IonToolbar, IonAvatar, IonLabel, IonItem],
})
export class CardImagenComponent  implements OnInit {
  @Input() usuario: string = '';
  @Input() urlImagen: string = '';
  @Input() fecha: string = '';
  @Input() votos: number = 0;
  @Output() votoRealizado = new EventEmitter<void>();
  @Input() yaVotado: boolean = false;
  @Input() fotoId!: string;
  @Input() mostrarHeader: boolean = false;
  @Output() cerrar = new EventEmitter<void>();
  constructor(private fotoService : FotosService) { addIcons({ heart, heartOutline });

  
}


  votar() {
    if (!this.fotoId) return;
  
    this.fotoService.toggleVoto(this.fotoId).then(resultado => {
      if (resultado === 'votado') {
        this.votos += 1;
        this.yaVotado = true;
      } else {
        this.votos -= 1;
        this.yaVotado = false;
      }
    });
  }

  capitalize(str: any): string {
    if (!str) return ''; 
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  ngOnInit() {}

}
