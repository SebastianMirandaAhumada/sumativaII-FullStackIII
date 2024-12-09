import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataUsuariosInteface } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class CartasService {
  url: string = 'http://localhost:8080/cartas';

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

  getCartas(): Observable<any> {
    const headers = this.auth();
    console.log(headers)

    return this.http.get(`${this.url}`,{headers});  
  }
  deleteCarta(id: number): Observable<any> {
    const headers = this.auth();
    return this.http.delete(`${this.url}/${id}`, { headers });
  }

  postCartas(carta:any): Observable<any> {
    const headers = this.auth();
    return this.http.post(`${this.url}`,carta, { headers });
  }

  putCartas(carta:any, id:number): Observable<any> {
    const headers = this.auth();
    return this.http.put(`${this.url}/${id}`,carta, { headers });
  }
  agregarUsuarios(users: any): Observable<DataUsuariosInteface> {
    const endpoint = `${this.url}/users`;
    return this.http.post<DataUsuariosInteface>(endpoint, users);
  }
}
