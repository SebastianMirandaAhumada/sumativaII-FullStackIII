import { Component } from '@angular/core';
import {
  CartaInterface,  
  DataUsuariosInteface,
  LibroInterface,
} from '../interfaces';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpServiceService } from '../service/http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CartasService } from '../service/cartas.service';
/**
 * @description
 * Componente de Administrador
 *
 * En este componente muestra la vista de la pagina de administracion de usuarios
 *
 */

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin.component.html',
  providers: [HttpServiceService, CartasService],

  
})
export class AdminComponent {
  public data: LibroInterface[];
  public dataCartas: CartaInterface[];

  public error: string;
  public id: number;

  items: DataUsuariosInteface[] = [];


  form = new FormGroup(
    {
      titulo: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      autor: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      anioPublicacion: new FormControl('', [Validators.required]),
      genero: new FormControl('', [Validators.required]),
    }
  );

  formCartas = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2)]),
    precio: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    descripcion: new FormControl('', [Validators.required]),
    tipo: new FormControl('', [Validators.required]),
  });

  constructor(private service: HttpServiceService, public serviceCartas:CartasService) {}
  ngOnInit() {
    this.mostrarJuegos();
  }
  mostrarJuegos() {
    this.service.getLibros().subscribe({
      next: (e) => {
        this.data = e;
        console.log(e);
      },
      error: (e) => {
        console.log(e.error);
        this.error = e.error;
      },
    });
    this.serviceCartas.getCartas().subscribe({
      next: (e) => {
        this.dataCartas = e;
        console.log(e);
      },
      error: (e) => {
        console.log(e.error);
        this.error = e.error;
      },
    })
  }

  borrar(id: number) {
    this.service.deleteLibro(id).subscribe({
      next: () => {
        window.alert(`Libro ${id}, Eliminado correctamente!`);
        this.mostrarJuegos(); // Recargar la lista de libros
      },
      error: (err) => {
        console.error('Error al eliminar libro', err);
        // Puedes agregar un manejo de error más específico aquí
      }
    });
  }


  borrarCarta(name: number) {
    // this.data = this.data.filter((user) => user.id !== name);
    this.serviceCartas.deleteCarta(name).subscribe({
      next:(e)=>{console.log(e)},
      error:(e)=>{console.log(e)},
    })
    window.alert(`Carta ${name}, Eliminada correctamente!`);
    window.location.reload();
  }




  getform(id: number) {
   const carta = this.data.find((carta) => carta.id === id);
    this.id = carta.id

   const form = this.form.setValue({
      titulo: carta?.titulo,
      anioPublicacion: carta.anioPublicacion,
      autor: carta.autor,
      genero: carta.genero,
    });

   


  }

  getformCarta(id: number) {
    const carta = this.dataCartas.find((carta) => carta.id === id);
    this.id = carta.id
    
    this.formCartas.setValue({
      nombre: carta?.nombre,
      precio: carta.precio,
      descripcion: carta.descripcion,
      tipo: carta.tipo,
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
   *@description
   *  Maneja el envío del formulario de Edicion. Alerta al usuario
   */
  submit() {
    window.alert(`Libro ${this.form.value.titulo}, Editado!`);
    console.log('Datos enviados:', this.form.value);
    this.service.putLibros(this.form.value, this.id).subscribe({
      next:(e)=>{ alert('Libro actualizado correctamente!')},
      error:(e)=>{console.log(e)},
    })    

  }
  submitCartas() {
    window.alert(`Libro ${this.formCartas.value.nombre}, Editado!`);

    this.serviceCartas.putCartas(this.formCartas.value, this.id).subscribe({
      next:(e)=>{console.log(e)},
      error:(e)=>{console.log(e)},
    })
    // window.location.reload();

  }
}
