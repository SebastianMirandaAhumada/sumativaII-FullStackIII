import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LocalStorageService } from '../../../service/localStorage.service';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';


/**
 * @description
 * Componente para manejar el formulario de usuario, permitiendo actualizar información y cerrar sesión.
 */

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf, FormsModule, ReactiveFormsModule],

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  /**
   * @constructor
   * @param {LocalStorageService} localStorageService - Servicio para manejar el almacenamiento en localStorage.
   * @param {Router} router - Servicio de Angular para la navegación.
   */

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,

  ) {
    this.getform();
  }
  /**
   * @description
   * FormGroup para manejar los controles del formulario de usuario.
   */
  form = new FormGroup(
    {
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      pass: new FormControl('', [Validators.required]),
      passconfirm: new FormControl(''),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );
  /**
   * @description
   * Obtiene el formulario almacenado en localStorage y establece los valores en el formulario actual.
   */
  getform() {
    const user = localStorage.getItem('usuario');
    const form = user ? JSON.parse(user) : null;

    this.form.setValue({
      name: form?.name || '',
      email: form?.email || '',
      phone: form?.phone || '',
      pass: form?.pass || '',
      passconfirm: form?.passconfirm || '',
    });
  }
  /**
   * @description
   * Getter para obtener los controles del formulario.
   * @returns {FormGroup['controls']} Los controles del formulario.
   */
  get f() {
    return this.form.controls;
  }
  /**
   * @description
   * Validador para comprobar que las contraseñas coincidan.
   * @param {AbstractControl} control - El grupo de controles que contiene las contraseñas.
   * @returns {ValidationErrors | null} Un objeto de errores de validación si las contraseñas no coinciden, de lo contrario null.
   */
  passwordMatchValidator(control: AbstractControl) {
    return control.get('pass')?.value === control.get('passconfirm')?.value
      ? null
      : {
          mismatch: true,
        };
  }
  /**
   * @description
   * Maneja el envío del formulario. Alerta al usuario y guarda los cambios en localStorage.
   */
  submit() {
    window.alert(
      `Hola ${this.form.value.name}, ha sido cambiado correctamente!`
    );
    this.router.navigate(['/', 'user']).then(() => {
      window.location.reload();
    });
    this.localStorageService.addItem('usuario', this.form.value);
    localStorage.setItem('token', 'aaaaa');
  }

  /**
   * @description
   * Cierra la sesión del usuario, eliminando el token de autenticación y redirigiendo a la página principal.
   */
  
  cerrarSesion() {
    localStorage.removeItem('user');
    localStorage.removeItem('pass');
    this.router.navigate(['/', 'home']).then(() => {
      window.location.reload();
    });
  }
}
