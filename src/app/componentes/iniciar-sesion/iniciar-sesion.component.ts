import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { ToastController, IonItem, IonContent, IonButton, IonInput, IonLabel, IonNote, IonFooter } from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { ElementRef, Renderer2 } from '@angular/core';
import { EAutenticacion } from 'src/app/modelo/enumerador/eautenticacion';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.scss'],
  imports: [IonNote, 
    IonLabel, IonButton, IonInput, IonItem, IonContent, ReactiveFormsModule, NgIf,LottieComponent
  ]
})
export class IniciarSesionComponent implements OnInit {
  usuarioTipo = 1;
  form!: FormGroup;
  enProceso = false;

  private fb = inject(FormBuilder);
  private auth = inject(AutenticacionService);
  private router = inject(Router);
  private toastController = inject(ToastController);

  private toastCtrl: ToastController = inject(ToastController);
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
/*
  <!--
  
  {"id":1, "correo":"admin@admin.com", "clave":111111, "perfil":"admin", "sexo":"femenino"}
{"id":2, "correo":"invitado@invitado.com", "clave":222222, "perfil":"invitado", "sexo":"femenino"}
{"id":3, "correo":"usuario@usuario.com", "clave":333333, "perfil":"usuario", "sexo":"masculino"}
{"id":4, "correo":"anonimo@anonimo.com", "clave":444444, "perfil":"usuario", "sexo":"masculino"}
{"id":5, "correo":"tester@tester.com", "clave":555555, "perfil":"tester","sexo": "femenino"}
  -->
*/
  seleccionarUsuario(tipo : number){
    this.usuarioTipo = tipo;
    switch (tipo){
      case 1: {
        this.form.setValue({
          correo : "usuario@usuario.com",
          clave : "333333"
        })
        break;
      }
      case 2: {
        this.form.setValue({
          correo : "tester@gmail.com",
          clave : "1234567890"
        })
        break;
      }
      case 3: {
        this.form.setValue({
          correo : "admin@admin.com",
          clave : "111111"
        })
        break;
      }
      

    }
  }

  moverArriba() {
    const container = this.el.nativeElement.querySelector('.container');
    this.renderer.addClass(container, 'mover');
  }

  moverAbajo() {
    const container = this.el.nativeElement.querySelector('.container');
    this.renderer.removeClass(container, 'mover');
  }
  async login() {
    if (this.enProceso) return;
    this.enProceso = true;
    const { correo, clave } = this.form.value;

    try {
      await this.auth.iniciarSesion(correo, clave);
      this.form.setValue({
        correo : "",
        clave : ""
      })
      this.mostrarToast('Inicio exitoso!', 'success');
      this.router.navigate(['/home']);
    } catch (error : any) {
          console.error(error);
    
          const mensajesError = new Map<string, EAutenticacion>([
            ["auth/email-already-in-use", EAutenticacion.CORREO_EN_USO],
            ["auth/weak-password", EAutenticacion.CLAVE_INVALIDO],
            ["auth/invalid-email", EAutenticacion.CORREO_INVALIDO],
            ["auth/missing-email", EAutenticacion.CAMPO_CORREO_VACIO],
            ["auth/missing-password", EAutenticacion.CAMPO_CLAVE_VACIO],
            ["auth/admin-restricted-operation", EAutenticacion.CAMPOS_VACIOS],
            ["auth/invalid-credential", EAutenticacion.CREDENCIALES_INVALIDAS]
          ]);
          const mensaje = mensajesError.get(error.code) || EAutenticacion.ERROR_DESCONOCIDO;
          this.mostrarToast(mensaje);
        } finally {
          this.enProceso = false;
        }
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

  opcionesAnimacion: AnimationOptions = {
    path: 'assets/animaciones/login.json', 
    autoplay: true,
    loop: true,
  };

  registro() {
    this.router.navigate(["/registro"]);
  }
}
