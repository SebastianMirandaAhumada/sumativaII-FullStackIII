import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from '../../../../service/localStorage.service';
/**
 * @description
 * Componente del pie de pagina
 *
 * En este componente muestra el pie de pagina 
 */
/**
 * @usageNotes
 * 1. Se importa este componente  y en app.component.ts
 * 2. Añade el 'app-footer' en la plantilla de pie de pagina
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  flag: boolean = false;
  isAuthenticated: boolean = false;
  constructor() {}
  
    /**
   * @description
   * Muestra el nombre de usuario en la barra de navegación si el usuario está autenticado.
   * 
   */
  ngOnInit() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;
  }
}
