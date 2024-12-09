import { Component } from '@angular/core';
import { CartaInterface, DataJuegosInteface, LibroInterface } from '../interfaces';
import { CartService } from '../cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { HttpServiceService } from '../service/http-service.service';
import { HttpClientModule } from '@angular/common/http';

/**
 * @description
 * Componente de Juegos
 *
 * En este componente muestra la vista de los juegos en el carrito de compras
 *
 */

@Component({
  selector: 'app-juegos',
  standalone: true,
  imports: [NgFor, HttpClientModule, CommonModule],
  providers: [HttpServiceService],
  templateUrl: './juegos.component.html',
  styleUrl: './juegos.component.scss',
})
export class JuegosComponent {
  items: LibroInterface[] = [];
  itemsCartas: CartaInterface[] = [];
  precio: number = 0;

  constructor(public service: HttpServiceService) {}

  /**
   * @description Método que se ejecuta al inicializar el componente.
   * Obtiene los juegos guardados en el localStorage con la clave 'carrito',
   * los parsea y los asigna a la variable `items`.
   * Calcula y asigna la suma de los precios de los juegos a la variable `precio`.
   */

  ngOnInit(): void {

    this.items = JSON.parse(localStorage.getItem('cart') || '[]');
    this.itemsCartas = JSON.parse(localStorage.getItem('carta') || '[]');

  }

  /**
   * Borrar Usuario
   * @param {string} name - El nombre del juego que es unico
   * @returns{LocalStorage} - Filtra los juegos por nombre y despues lo setea
   * en el localStorage cuando se borre un juego
   * Ademas, le hace un descuento por cada juego que se filtre y te muestre un
   * precio total menors
   */

  borrar(id: any) {
    this.items = JSON.parse(localStorage.getItem('cart') || '[]');

    this.items = this.items.filter((item: any) => item.id !== id);
  
    // Guarda el carrito actualizado de vuelta en localStorage
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.itemsCartas = JSON.parse(localStorage.getItem('carta') || '[]');

    this.itemsCartas = this.itemsCartas.filter((item: any) => item.id !== id);
  
    // Guarda el carrito actualizado de vuelta en localStorage
    localStorage.setItem('carta', JSON.stringify(this.itemsCartas));
    // localStorage.removeItem('cart');
  }
}
