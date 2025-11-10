import { Component } from '@angular/core';
import {ReactiveFormsModule, FormControl, FormGroup, Validators} from "@angular/forms";
import { Credencials } from '../../interfaces/credencials';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  LoginForm = new FormGroup({
 emailLogin: new FormControl(''),
 passwordLogin: new FormControl('')

  })

  //mensaje de eventos
  handleSubmit(){
    const email = this.LoginForm.value.emailLogin;
    const password = this.LoginForm.value.passwordLogin;
    console.log(email, password);
   // const credencialsLogin : Credencials = {
     // emailLogin : this.LoginForm.value.emailLogin,
      //passwordLogin : this.LoginForm.value.passwordLogin || ''
  }

 // console.log("Credenciales para inicio de sesion", credencialsLogin);
}

