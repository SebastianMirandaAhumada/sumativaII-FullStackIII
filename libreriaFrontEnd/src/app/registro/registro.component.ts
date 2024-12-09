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

import { HttpServiceService } from '../service/http-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [HttpServiceService],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  constructor(private router: Router, private service: HttpServiceService) {}

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    anioPublicacion: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    autor: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  submit() {
    window.alert(
      `Hola ${this.form.value.titulo}, te has registrado correctamente!`
    );

    console.log(this.form.value);

    this.service.postLibros(this.form.value).subscribe({
      next: (e) => {
        console.log(e);
      },
    });
    
  }
}
