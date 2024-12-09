import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { RegistroComponent } from './registro.component';
import { HttpServiceService } from '../service/http-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  let service: HttpServiceService;
  let httpMock: HttpTestingController;
  let mockRouter = { navigate: jasmine.createSpy('navigate') };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule, RegistroComponent],
      declarations: [],
      providers: [
        HttpServiceService,
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HttpServiceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark the form as invalid when empty', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should mark the form as valid when all fields are filled correctly', () => {
    component.form.setValue({
      titulo: 'Libro de prueba',
      anioPublicacion: '202220',
      autor: 'Autor de prueba',
      genero: 'Ficción',
    });
    expect(component.form.valid).toBeTrue();
  });


})