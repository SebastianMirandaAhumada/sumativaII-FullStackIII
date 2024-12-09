// import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

// import { AdminComponent } from './admin.component';
// import { HttpServiceService } from '../service/http-service.service';
// import { CartasService } from '../service/cartas.service';
// import { of, throwError } from 'rxjs';
// import {
//   FormBuilder,
//   FormControl,
//   FormGroup,
//   FormsModule,
//   ReactiveFormsModule,
//   Validators,
// } from '@angular/forms';
// import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
// import {
//   HttpClientModule,
//   HttpErrorResponse,
//   HttpHeaders,
// } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { RegistroComponent } from '../registro/registro.component';

// describe('AdminComponent', () => {
//   let component: AdminComponent;
//   let fixture: ComponentFixture<AdminComponent>;
//   let httpServiceMock: jasmine.SpyObj<HttpServiceService>;
//   let cartasServiceMock: jasmine.SpyObj<CartasService>;

//   let httpMock: HttpTestingController;
//   let service: HttpServiceService;
  

//   beforeEach(async () => {


//     httpServiceMock = jasmine.createSpyObj('HttpServiceService', [
//       'getLibros',
//       'deleteLibro',
//       'putLibros',
//     ]);
//     cartasServiceMock = jasmine.createSpyObj('CartasService', [
//       'getCartas',
//       'deleteCarta',
//       'putCartas',
//     ]);

//     await TestBed.configureTestingModule({
//       imports: [
//         ReactiveFormsModule,
//         HttpClientTestingModule,
//         FormsModule,
//         CommonModule,
//         ReactiveFormsModule,
//         HttpClientModule,
//       ],
//       providers: [
//         FormBuilder,
//         { provide: HttpServiceService, useValue: httpServiceMock },
//         {
//           provide: HttpServiceService,
//           useValue: jasmine.createSpyObj('HttpServiceService', ['getLibros', 'getCartas', 'deleteLibro','putLibros']),
//         },
//         { provide: CartasService, useValue: cartasServiceMock },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(AdminComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     httpServiceMock.putLibros.and.returnValue(of({ message: 'Libro actualizado' }));
//     httpMock = TestBed.inject(HttpTestingController);
//     service = TestBed.inject(HttpServiceService);

//   });

//   it('debería crear el componente', () => {
//     expect(component).toBeTruthy();
//   });



// });
