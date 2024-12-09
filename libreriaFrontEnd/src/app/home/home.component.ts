import { Component, OnInit } from '@angular/core';

import {
  CartaInterface,
  DataJuegosInteface,
  LibroInterface,
} from '../interfaces';
import { CommonModule, NgFor } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { HttpServiceService } from '../service/http-service.service';
import { CartasService } from '../service/cartas.service';

/**
 * @description
 * Componente de Inicio
 *
 * En este componente muestra la vista del inicio de la pagina cuando se entra a ella
 *
 */

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, HttpClientModule, CommonModule],
  providers: [HttpServiceService, CartasService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public dataCartas: CartaInterface[];
  public originalDataCartas: CartaInterface[];
  public error: string;

  private items: DataJuegosInteface[] = [];

  public originalData: LibroInterface[];
  public data: LibroInterface[];
  /**
   *
   *
   * @constructor
   * @param {LocalStorageService} localStorageService - Servicio para manejar el almacenamiento en localStorage.
   */
  constructor(
    private service: HttpServiceService,
    private serviceCartas: CartasService
  ) {}

  ngOnInit() {
    this.mostrarJuegos();
  }

  getItems() {
    return this.data;
  }

  /**
   * Borrar Usuario
   * @param {DataJuegosInteface} product - un objeto que sigue la interfaz DataJuegosInteface,
   *  que representa un producto
   * y lo guarda dentro del arreglo this.item, para que despues este lo guarde en el localStorage
   */
  addToCart(product: LibroInterface) {
    // Obtén el carrito actual del localStorage (si existe)
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Asegúrate de que sea un arreglo antes de agregar
    if (Array.isArray(cart)) {
      cart.push(product); // Agrega el nuevo producto
      localStorage.setItem('cart', JSON.stringify(cart)); // Guarda de nuevo en el localStorage
    } else {
      // Si por algún motivo el contenido no es un arreglo, inicialízalo
      localStorage.setItem('cart', JSON.stringify([product]));
    }
  }
  addToCartCart(product: CartaInterface) {
    // Obtén el carrito actual del localStorage (si existe)
    const carta = JSON.parse(localStorage.getItem('carta') || '[]');
    
    // Asegúrate de que sea un arreglo antes de agregar
    if (Array.isArray(carta)) {
      carta.push(product); // Agrega el nuevo producto
      localStorage.setItem('carta', JSON.stringify(carta)); // Guarda de nuevo en el localStorage
    } else {
      // Si por algún motivo el contenido no es un arreglo, inicialízalo
      localStorage.setItem('carta', JSON.stringify([product]));
    }
  }
  /**
   * @description
   * Devuelve todos los productos añadidos al carrito.
   * @returns {DataJuegosInteface[]} El arreglo de productos añadidos al carrito.
   */
  mostrarJuegos() {
    this.service.getLibros().subscribe({
      next: (e) => {
        this.originalData = e; // Guarda los datos originales
        this.data = [...this.originalData];
      },
      error: (e) => {
        console.log(e.error);
        this.error = e.error;
      },
    });
    this.serviceCartas.getCartas().subscribe({
      next: (e) => {
        this.originalDataCartas = e;
        this.dataCartas = [...this.originalDataCartas];
      },
      error: (e) => {
        console.log(e.error);
        this.error = e.error;
      },
    });
  }

  onFilter(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.data = this.originalData.filter((libro) =>
      libro.titulo.toLowerCase().includes(inputValue)
    );
  }
  onFilterCarts(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataCartas = this.originalDataCartas.filter((carta) =>
      carta.nombre.toLowerCase().includes(inputValue)
    );
  }
}
