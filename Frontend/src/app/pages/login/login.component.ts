import { Component, inject } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from "@angular/forms";
import { Credencials } from '../../interfaces/credencials';
import Swal from 'sweetalert2';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

 private _loginService = inject(LoginService);
  private router = inject(Router);

  loginForm = new FormGroup({
    emailLogin: new FormControl('', [Validators.required, Validators.email]),
    passwordLogin: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // manejo de eventos
  handleSubmit() {
    // const email = this.loginForm.value.emailLogin;
    // const password = this.loginForm.value.passwordLogin;
    // console.log(email,password );

    const credencials: Credencials = {
      emailLogin: this.loginForm.value.emailLogin || '',
      passwordLogin: this.loginForm.value.passwordLogin || ''
    };
    console.log('Credenciales para Login', credencials);
    //Logica de autenticacion al back va aqui
    this._loginService.login(credencials).subscribe({
      //manejo de la respuesta exitosa o error
      next: (res: any) => {
        console.log(res);
        if (res) {
          //guardar el token en el local storage
          localStorage.setItem('token', res.token);
          console.log("token guardado", res.token);

          if (res) {
            localStorage.setItem('usuarioId', res._id);
            console.log('ID de usuario guardado:', res._id);
          }

            Swal.fire({
              title: "Excelente!",
              icon: "success",
              text: res.mensaje,
              draggable: true
            }).then(() => {
              // this.router.navigate(['/admin']);
              this._loginService.redirectTo();
            })
          }
        },
        error: (err: any) => {
          console.error('Error en login', err.error.mensaje);
          Swal.fire({
            title: "Oops!",
            icon: "error",
            draggable: true
          });
        }

      });
  }
}
