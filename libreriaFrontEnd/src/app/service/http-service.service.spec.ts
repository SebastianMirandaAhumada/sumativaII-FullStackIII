import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpServiceService } from './http-service.service';
import { HttpHeaders } from '@angular/common/http';

describe('HttpServiceService', () => {
  let service: HttpServiceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpServiceService],
    });

    service = TestBed.inject(HttpServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should fetch libros without headers', () => {
    const mockResponse = [{ id: 1, titulo: 'Libro 1' }];

    service.getLibros().subscribe((libros) => {
      expect(libros).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/libros');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Emula la respuesta del servidor
  });

  it('should delete a libro with correct headers', () => {
    const libroId = 1;
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') return 'testUser';
      if (key === 'pass') return 'testPass';
      return null;
    });

    service.deleteLibro(libroId).subscribe((response) => {
      expect(response).toBeTruthy(); // Verifica que la respuesta sea exitosa
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/libros/${libroId}`);
    expect(req.request.method).toBe('DELETE');
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic ' + btoa('testUser:testPass')
    );
    req.flush({}); // Emula una respuesta vacía para DELETE
  });

  it('should post a libro with correct headers', () => {
    const newLibro = { titulo: 'Libro Nuevo', autor: 'Autor Prueba' };

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') return 'testUser';
      if (key === 'pass') return 'testPass';
      return null;
    });

    service.postLibros(newLibro).subscribe((response) => {
      expect(response).toEqual(newLibro); // Verifica que la respuesta sea la misma que enviamos
    });

    const req = httpMock.expectOne('http://localhost:8080/api/libros');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newLibro);
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic ' + btoa('testUser:testPass')
    );
    req.flush(newLibro); // Emula la respuesta del servidor
  });

  it('should update a libro with correct headers', () => {
    const updatedLibro = { titulo: 'Libro Actualizado', autor: 'Autor Actualizado' };
    const libroId = 1;

    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') return 'testUser';
      if (key === 'pass') return 'testPass';
      return null;
    });

    service.putLibros(updatedLibro, libroId).subscribe((response) => {
      expect(response).toEqual(updatedLibro); // Verifica que la respuesta sea la misma que enviamos
    });

    const req = httpMock.expectOne(`http://localhost:8080/api/libros/${libroId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedLibro);
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic ' + btoa('testUser:testPass')
    );
    req.flush(updatedLibro); // Emula la respuesta del servidor
  });
});
