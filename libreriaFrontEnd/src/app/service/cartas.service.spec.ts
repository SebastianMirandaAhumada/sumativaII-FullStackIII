import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CartasService } from './cartas.service';
import { HttpHeaders } from '@angular/common/http';

describe('CartasService', () => {
  let service: CartasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CartasService],
    });

    service = TestBed.inject(CartasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no hay solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch cartas with correct headers', () => {
    const mockResponse = [{ id: 1, name: 'Carta 1' }];
  
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'user') return 'testUser';
      if (key === 'pass') return 'testPass';
      return null;
    });
  
    service.getCartas().subscribe((cartas) => {
      expect(cartas).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('http://localhost:8080/cartas');
    expect(req.request.method).toBe('GET');
  
    // Verificar que los encabezados contienen la autorización correcta
    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(
      'Basic ' + btoa('testUser:testPass')
    );
  
    req.flush(mockResponse);
  });

  it('should delete carta by id', () => {
    const id = 1;

    spyOn(localStorage, 'getItem').and.returnValue('testPass');

    service.deleteCarta(id).subscribe((response) => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`http://localhost:8080/cartas/${id}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should post new carta', () => {
    const newCarta = { name: 'New Carta' };
    const mockResponse = { id: 1, ...newCarta };

    spyOn(localStorage, 'getItem').and.returnValue('testPass');

    service.postCartas(newCarta).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8080/cartas');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newCarta);
    req.flush(mockResponse);
  });

  it('should update carta by id', () => {
    const updatedCarta = { name: 'Updated Carta' };
    const id = 1;

    spyOn(localStorage, 'getItem').and.returnValue('testPass');

    service.putCartas(updatedCarta, id).subscribe((response) => {
      expect(response).toEqual(updatedCarta);
    });

    const req = httpMock.expectOne(`http://localhost:8080/cartas/${id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedCarta);
    req.flush(updatedCarta);
  });

  // it('should post users data', () => {
  //   const usersData = { username: 'testUser', email: 'test@example.com' };
  //   const mockResponse = { success: true };

  //   service.agregarUsuarios(usersData).subscribe((response) => {
  //     expect(response).toEqual(mockResponse);
  //   });

  //   const req = httpMock.expectOne('http://localhost:8080/cartas/users');
  //   expect(req.request.method).toBe('POST');
  //   expect(req.request.body).toEqual(usersData);
  //   req.flush(mockResponse);
  // });
});
