import { Component, OnInit } from '@angular/core';
import { LottieComponent } from 'ngx-lottie';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
  imports: [LottieComponent, NgIf]
})
export class SplashComponent implements OnInit {

  constructor(private router: Router){}
  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/iniciar-sesion'); // o '/home'
    }, 5000); // duración deseada del splash
  }
  options = {
    path: 'assets/animaciones/animacion.json',
    autoplay: true,
    loop: true
  };

  onAnimationCreated(animationItem: any) {
    animationItem.addEventListener('complete', () => {
      console.log('Animación terminada!');
      // redirigir con Router aquí si querés
    });
  }
}
