import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegosComponent } from './juegos.component';
import { HttpServiceService } from '../service/http-service.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CartaInterface, LibroInterface } from '../interfaces';

describe('JuegosComponent', () => {
  let component: JuegosComponent;
  let fixture: ComponentFixture<JuegosComponent>;
  let mockService: jasmine.SpyObj<HttpServiceService>;

  beforeEach(async () => {
    // Crear mocks para el servicio HttpServiceService
    mockService = jasmine.createSpyObj('HttpServiceService', ['obterLogin']);
    
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientModule, JuegosComponent],
      declarations: [],
      providers: [
        { provide: HttpServiceService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize items and itemsCartas from localStorage on ngOnInit', () => {
    // Simulamos que hay datos en localStorage
    const mockCart: LibroInterface[] = [
      { id: 1, titulo: 'Juego 1', autor: 'Autor 1', anioPublicacion: '2022', genero: 'Aventura',  },
      // Agrega más libros si es necesario
    ];
    const mockCarta: CartaInterface[] = [
      { id: 1, nombre: 'Carta 1', descripcion:'algo', tipo:'agua' , precio: 10}
      // Agrega más cartas si es necesario
    ];
    
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'cart') return JSON.stringify(mockCart);
      if (key === 'carta') return JSON.stringify(mockCarta);
      return null;
    });

    component.ngOnInit();

    expect(component.items).toEqual(mockCart);
    expect(component.itemsCartas).toEqual(mockCarta);
  });

  it('should delete an item from cart and cartas and update localStorage', () => {
    // Datos de ejemplo en localStorage
    const mockCart = [{ id: 1, name: 'Juego 1', price: 10 }];
    const mockCarta = [{ id: 1, name: 'Carta 1' }];
    
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'cart') return JSON.stringify(mockCart);
      if (key === 'carta') return JSON.stringify(mockCarta);
      return null;
    });

    spyOn(localStorage, 'setItem'); // Espía para verificar si se actualiza el localStorage

    component.ngOnInit(); // Inicializa el componente y carga los datos

    component.borrar(1); // Llamamos al método borrar para eliminar el juego

    // Verificamos que los elementos fueron eliminados
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([]));
    expect(localStorage.setItem).toHaveBeenCalledWith('carta', JSON.stringify([]));
  });
});
