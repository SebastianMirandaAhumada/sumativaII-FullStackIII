
import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';


import { CartasService } from '../../service/cartas.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [CartasService],
  templateUrl: './cartas.component.html',
  styleUrls: ['./cartas.component.scss'],
})
export class CartasComponent {
  constructor(private router: Router,private service: CartasService) {}

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    precio: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    descripcion: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    window.alert(
      `Hola ${this.form.value.nombre}, te has registrado correctamente!`
    );

    console.log(this.form.value);

    this.service.postCartas(this.form.value).subscribe({
      next: (e) => {
        console.log(e);
      },
    });

  }
}
