import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DataUsuariosInteface } from '../interfaces';
import { Router } from '@angular/router';
import { HttpServiceService } from '../service/http-service.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * @description
 * Componente para manejar el formulario de inicio de sesión.
 */

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [HttpServiceService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario: DataUsuariosInteface[];

  /**
   * @constructor
   * @param {Router} router - Servicio de Angular para la navegación.
   */
  constructor(private router: Router, private auth: HttpServiceService) {}
  /**
   * @description
   * FormGroup para manejar los controles del formulario de inicio de sesión.
   */
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    pass: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    // this.auth.obterLogin().subscribe({
    //   next: (e) => {
    //     this.usuario = e;
    //   },
    // });
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
   * Maneja el envío del formulario. Verifica las credenciales y redirige al usuario a la página principal si son correctas.
   */
  submit() {
    const password = this.form.value.pass;
    const user = this.form.value.email;

    localStorage.setItem('pass', password);
    localStorage.setItem('user', user);


    this.router.navigate(['/home']);
    window.location.reload();
  }
}
