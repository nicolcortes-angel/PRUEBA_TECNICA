import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';



@Injectable({
  providedIn: 'root'
})

export class UserService {
  private _httpClient = inject(HttpClient);
  private apiUrl = environment.appUrl;

  // metodos para hacer las peticiones a la api

  //peticion post
  postUser(userToCreate: FormData) {
    return this._httpClient.post(`${this.apiUrl}/users/crear`, userToCreate);
  }

  //peticion get
   getUser() {
    const token = localStorage.getItem('token'); // o sessionStorage si lo guardas ahí
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.get(`${this.apiUrl}/users/mostrar`, { headers });
  }

  //peticion get by id
 getUserById(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this._httpClient.get(`${this.apiUrl}/users/mostrar/${id}`, { headers });
  }


  // peticion put
  putUser(userToUpdate: FormData, id: string) {
    return this._httpClient.put(`${this.apiUrl}/users/actualizar/${id}`, userToUpdate);
  }

  // peticion delete
  deleteUser(id: string) {
    return this._httpClient.delete(`${this.apiUrl}/users/eliminar/${id}`);
  }

}