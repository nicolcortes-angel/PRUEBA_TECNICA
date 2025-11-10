import { HttpInterceptorFn } from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const loginService = inject(LoginService);
 const token = loginService.getToken();

 const request = token ? req.clone  ({setHeaders: {Authorization: `Bearer ${token}`}}) : req;

  return next(req);
};
