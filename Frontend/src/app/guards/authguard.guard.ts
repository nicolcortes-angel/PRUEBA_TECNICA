// los guards -> protegen rutas (contenido) del front
// Can Activate -> protector de rutas -> true o false
//true -> que si se puede moistrar ese contenido 
// fasle -> que no se puede mostrar ese contenido

import { CanActivateFn } from '@angular/router';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const authguardGuard: CanActivateFn = (route, state) => {
  const _loginService = inject(LoginService);
  const _router = inject(Router);


  //1. VALIDACION 1 ya inicio sesion
  if(!_loginService.isloggedIn){
    _router.navigate(['/login']);
    return false;
  }
  
  if(!_loginService.isAdmin()){
    alert('No tienes permisos para acceder a esta ruta');
    _router.navigate(['/']);
    return false;
  }
  
  return true;
};
