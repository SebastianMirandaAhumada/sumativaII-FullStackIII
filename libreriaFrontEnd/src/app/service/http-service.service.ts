import {
  HttpClient,
  HttpHeaders,
  HttpClientModule,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataJuegosInteface, DataUsuariosInteface, LibroInterface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HttpServiceService {  
  url2: string = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) {
    this.auth();
  }

  auth() {
    const pass = localStorage.getItem('pass');
    const user = localStorage.getItem('user');
    console.log(user);
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${user}:${pass}`), // Cambia por las credenciales correctas
    });
    return headers;
  }

  getLibros(): Observable<any> {
    
    return this.http.get(`${this.url2}`);
    
  }

  deleteLibro(id: number): Observable<any> {
    const headers = this.auth();
    return this.http.delete(`${this.url2}/${id}`, { headers });
  }

  postLibros(libro:any): Observable<any> {
    const headers = this.auth();
    return this.http.post(`${this.url2}`,libro, { headers });
  }

  putLibros(libro:any, id:number): Observable<any> {
    const headers = this.auth();
    return this.http.put(`${this.url2}/${id}`,libro, { headers });
  }

  

}
