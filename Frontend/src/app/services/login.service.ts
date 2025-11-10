import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Credencials} from '../interfaces/credencials';  
import { environment } from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
 
   //1. inyectar hhptclient y las variables necesarias
    private _httpClient = inject(HttpClient);
    private _router = inject(Router);
    private apiUrl = environment.appUrl;

    //2. desarollar la logica del servicio 


    //la peticio Post 
    login(credencialesIngreso : Credencials){
      return this._httpClient.post(`${this.apiUrl}/login`, credencialesIngreso);
    };

    //decirle al navegador que guarde el token

    getToken() {
  return localStorage.getItem('token');}

  //2.3 validar si es rol de admin o no
isAdmin(){
 const token = this.getToken();

 //En caso de que si haya token, decodifiquelo
  if(token){
    const decoded : any = jwtDecode(token);
    return decoded.admin === true ? true : false;



  } else {
    console.log('No hay token disponible');
    return false;
  }
};

  //2.4 redireccion un avez que ya inicio

  redirectTo(){
    if(this.isAdmin()){
    this._router.navigate(['/admin']);
    } else {
      this._router.navigate(['/']);
  }
};
  

  //2.5 el cerrar sesion
Logout(){
  localStorage.removeItem('token');
  alert ('Sesion cerrada correctamente');
  this._router.navigate(['/login']);  

}
  
//6. para saber si el usuario inicio sesion
isloggedIn(){
  return this.getToken() ? true : false;
}

}