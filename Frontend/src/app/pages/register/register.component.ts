import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  ɵInternalFormsSharedModule,
} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from '../../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, ɵInternalFormsSharedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  private _userService = inject(UserService);
  private _router = inject(Router);

  // Formulario reactivo
  registerForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null, [Validators.required, Validators.min(18)]),
    codigoempleado: new FormControl<number | null>(null),
    codigodepartamento: new FormControl<number | null>(null),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  // Enviar formulario
  handleSubmit(): void {
    if (this.registerForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    const userData = new FormData();
    userData.append('name', this.registerForm.value.name || '');
    userData.append('username', this.registerForm.value.username || '');
    userData.append('email', this.registerForm.value.email || '');
    userData.append('age', this.registerForm.value.age?.toString() || '');
    userData.append('codigoempleado', this.registerForm.value.codigoempleado?.toString() || '');
    userData.append('codigodepartamento', this.registerForm.value.codigodepartamento?.toString() || '');
    userData.append('password', this.registerForm.value.password || '');

    console.log('Datos del usuario a registrar:');
    for (const pair of userData.entries()) {
      console.log(pair[0] + ':', pair[1]);
    }

    // Enviar datos al servicio
    this._userService.postUser(userData).subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta del servidor:', res);

        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: res.mensaje || 'Usuario registrado correctamente.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this.registerForm.reset();
          this._router.navigate(['/login']);
        });
      },
      error: (err: any) => {
        console.error('Error en el registro:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.error?.mensaje || 'Ocurrió un error al registrar el usuario.',
        });
      },
    });
  }
}