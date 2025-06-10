import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonItem, IonContent, IonButton, IonInput, IonLabel, IonNote } from "@ionic/angular/standalone";
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { ToastController } from '@ionic/angular';
import { NgIf } from '@angular/common';
import { EAutenticacion } from 'src/app/modelo/enumerador/eautenticacion';

import { AnimationOptions, LottieComponent } from 'ngx-lottie';

import { ElementRef, Renderer2 } from '@angular/core';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  standalone: true,
  imports: [IonNote, 
    IonLabel, IonButton, IonInput, IonItem, IonContent,
    ReactiveFormsModule, NgIf, LottieComponent
  ]
})
export class RegistroComponent implements OnInit {

  formRegistro!: FormGroup;
  enProceso: boolean = false;
  usuarioTipo = 1;

  private router: Router = inject(Router);
  private autenticacion: AutenticacionService = inject(AutenticacionService);
  private fb: FormBuilder = inject(FormBuilder);
  private toastCtrl: ToastController = inject(ToastController);

  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit() {
    this.formRegistro = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', [Validators.required, Validators.minLength(6)]],
      claveConfirmacion: ['', Validators.required],
    }, {
      validators: this.clavesIgualesValidator
    });
  }

  // Custom validator
  clavesIgualesValidator(form: FormGroup) {
    const clave = form.get('clave')?.value;
    const claveConfirmacion = form.get('claveConfirmacion')?.value;
    return clave === claveConfirmacion ? null : { clavesDistintas: true };
  }

  inciarSesion() {
    this.router.navigate(["/iniciar-sesion"]);
  }

  async registrar() {
    if (this.enProceso || this.formRegistro.invalid) {
      this.mostrarToast('Por favor completá correctamente el formulario');
      return;
    }
  
    this.enProceso = true;
    const { nombre, correo, clave } = this.formRegistro.value;
  
    try {
      const user = await this.autenticacion.registrar(correo, clave, nombre);
      console.log("Usuario registrado con éxito:", user);
      this.mostrarToast('¡Registro exitoso!', 'success');
      this.router.navigate(['/home']);
    } catch (error : any) {
      console.error(error);

      const mensajesError = new Map<string, EAutenticacion>([
        ["auth/email-already-in-use", EAutenticacion.CORREO_EN_USO],
        ["auth/weak-password", EAutenticacion.CLAVE_INVALIDO],
        ["auth/invalid-email", EAutenticacion.CORREO_INVALIDO],
        ["auth/missing-email", EAutenticacion.CAMPO_CORREO_VACIO],
        ["auth/missing-password", EAutenticacion.CAMPO_CLAVE_VACIO],
        ["auth/admin-restricted-operation", EAutenticacion.CAMPOS_VACIOS]
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

  moverArriba() {
    const container = this.el.nativeElement.querySelector('.container');
    this.renderer.addClass(container, 'mover');
  }

  moverAbajo() {
    const container = this.el.nativeElement.querySelector('.container');
    this.renderer.removeClass(container, 'mover');
  }
}
