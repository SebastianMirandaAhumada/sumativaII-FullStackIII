// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginComponent } from './login.component';
// import { Router } from '@angular/router';
// import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpServiceService } from '../service/http-service.service';
// import { of } from 'rxjs';

// describe('LoginComponent', () => {
//   let component: LoginComponent;
//   let fixture: ComponentFixture<LoginComponent>;
//   let mockRouter: jasmine.SpyObj<Router>;
//   let mockAuthService: jasmine.SpyObj<HttpServiceService>;

//   beforeEach(async () => {
//     // Crear mocks para el servicio y el router
//     mockRouter = jasmine.createSpyObj('Router', ['navigate']);
//     mockAuthService = jasmine.createSpyObj('HttpServiceService', ['obterLogin']);

//     await TestBed.configureTestingModule({
//       imports: [ReactiveFormsModule, FormsModule, HttpClientModule, LoginComponent],
//       declarations: [],
//       providers: [
//         { provide: Router, useValue: mockRouter },
//         { provide: HttpServiceService, useValue: mockAuthService },
//       ],
//     }).compileComponents();

//     fixture = TestBed.createComponent(LoginComponent);
//     component = fixture.componentInstance;

//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the form with default values', () => {
//     expect(component.form).toBeDefined();
//     expect(component.form.controls['email'].value).toBe('');
//     expect(component.form.controls['pass'].value).toBe('');
//   });

//   it('should mark form as invalid if required fields are empty', () => {
//     component.form.controls['email'].setValue('');
//     component.form.controls['pass'].setValue('');

//     expect(component.form.valid).toBeFalse();
//   });

//   it('should call submit and navigate to /home if form is valid', () => {
//     const formValues = {
//       email: 'test@example.com',
//       pass: 'password123',
//     };

//     component.form.setValue(formValues);
//     localStorage.setItem = jasmine.createSpy('setItem');

//     component.submit();

//     expect(localStorage.setItem).toHaveBeenCalledWith('pass', formValues.pass);
//     expect(localStorage.setItem).toHaveBeenCalledWith('user', formValues.email);
//     expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
//     expect(window.location.reload).toHaveBeenCalled();
//   });

//   it('should not submit if form is invalid', () => {
//     component.form.controls['email'].setValue('');
//     component.form.controls['pass'].setValue('');

//     const submitSpy = spyOn(component, 'submit');

//     component.submit();

//     expect(submitSpy).toHaveBeenCalled();
//     expect(mockRouter.navigate).not.toHaveBeenCalled();
//   });


// });
