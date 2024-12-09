import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpServiceService } from '../service/http-service.service';
import { CartasService } from '../service/cartas.service';
import { of } from 'rxjs';
import { CartaInterface, LibroInterface } from '../interfaces';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpService: HttpServiceService;
  let cartasService: CartasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HomeComponent],
      declarations: [],
      providers: [HttpServiceService, CartasService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpService = TestBed.inject(HttpServiceService);
    cartasService = TestBed.inject(CartasService);
    httpMock = TestBed.inject(HttpTestingController);

    // Espiamos las funciones de los servicios para devolver datos simulados
    spyOn(httpService, 'getLibros').and.returnValue(
      of([
        {
          id: 1,
          titulo: 'Libro 1',
          autor: 'Autor 1',
          genero: 'Ficción',
          anioPublicacion: '2020',
        },
      ])
    );
    spyOn(cartasService, 'getCartas').and.returnValue(
      of([
        {
          id: 1,
          nombre: 'Carta 1',
          precio: 100,
          descripcion: 'Carta de prueba',
          tipo: 'Rara',
        },
      ])
    );
    localStorage.clear(); // Limpia el localStorage antes de cada prueba
    fixture.detectChanges(); // Detecta los cambios
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter books by title', () => {
    // Datos iniciales simulados con todas las propiedades de LibroInterface
    const mockBooks: LibroInterface[] = [
      {
        id: 1,
        titulo: 'Libro 1',

        autor: 'Autor 1',
        anioPublicacion: '2020',
        genero: 'Ficción',
      },
      {
        id: 2,
        titulo: 'Libro 2',
        autor: 'Autor 2',

        anioPublicacion: '2021',
        genero: 'No ficción',
      },
    ];

    // Inicializar los datos del componente
    component.data = [...mockBooks];
    component.originalData = [...mockBooks]; // Considerando que usas una copia para mantener los datos originales

    // Simula el evento input
    const inputElement = <HTMLInputElement>document.createElement('input');
    inputElement.value = 'Libro 1';
    const inputEvent = new Event('input');

    // Llama al método de filtrado del componente
    component.onFilter({ target: inputElement } as any); // Pasa el evento simulado

    // Verifica el resultado del filtrado
    expect(component.data.length).toBe(1); // Debería haber un libro filtrado
    expect(component.data[0].titulo).toBe('Libro 1'); // El título debe coincidir
  });

  it('should filter cards by name', () => {
    // Asegúrate de que los objetos tengan todas las propiedades requeridas por CartaInterface
    const initialCartas: CartaInterface[] = [
      {
        id: 1,
        nombre: 'Carta 1',
        precio: 100,
        descripcion: 'Descripción de Carta 1',
        tipo: 'Tipo 1',
      },
      {
        id: 2,
        nombre: 'Carta 2',
        precio: 150,
        descripcion: 'Descripción de Carta 2',
        tipo: 'Tipo 2',
      },
      {
        id: 3,
        nombre: 'Carta 3',
        precio: 200,
        descripcion: 'Descripción de Carta 3',
        tipo: 'Tipo 3',
      },
    ];

    // Inicializa el componente con las cartas
    component.originalDataCartas = initialCartas;
    component.dataCartas = [...initialCartas]; // Copia para no modificar directamente el original

    // Crea un evento de tipo input con el valor que deseas filtrar
    const event = {
      target: { value: 'Carta 1' },
    } as any; // Necesitamos asegurarnos de que `event.target.value` sea reconocido

    // Llama al método onFilterCarts con el evento simulado
    component.onFilterCarts(event);

    // Verifica que solo 'Carta 1' quede en los resultados filtrados
    expect(component.dataCartas.length).toBe(1);
    expect(component.dataCartas[0].nombre).toBe('Carta 1');
  });

  it('should add book to cart', () => {
    const libro = {
      id: 1,
      titulo: 'Libro 1',
      autor: 'Autor 1',
      genero: 'Ficción',
      anioPublicacion: '2020',
    } as LibroInterface;

    component.addToCart(libro);

    // Verifica que el libro se haya agregado al localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    expect(cart.length).toBe(1);
    expect(cart[0].titulo).toBe('Libro 1');
  });

  it('should add card to cart', () => {
    const carta = {
      id: 1,
      nombre: 'Carta 1',
      precio: 100,
      descripcion: 'Carta de prueba',
      tipo: 'Rara',
    } as CartaInterface;

    component.addToCartCart(carta);

    // Verifica que la carta se haya agregado al localStorage
    const cartaCart = JSON.parse(localStorage.getItem('carta') || '[]');
    expect(cartaCart.length).toBe(1);
    expect(cartaCart[0].nombre).toBe('Carta 1');
  });

  afterEach(() => {
    httpMock.verify(); // Asegura que no haya solicitudes HTTP pendientes
  });
});
