import { Injectable } from '@angular/core';

import { DataJuegosInteface } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: DataJuegosInteface[] = [];

  addToCart(product: DataJuegosInteface) {
    this.items.push(product);

    
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
  }
}
