import { Component, inject, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-updateformuser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './updateformuser.component.html',
  styleUrl: './updateformuser.component.css',
})
export class UpdateFormUserComponent implements OnInit {
  // Recibe el ID del usuario desde el padre o ruta
  @Input() userId: string | null = null;

  private _userService = inject(UserService);
  private _router = inject(Router);

  // Formulario reactivo
  updateForm = new FormGroup({
    name: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    age: new FormControl<number | null>(null, [Validators.min(18)]),
    codigoempleado: new FormControl<number | null>(null),
    codigodepartamento: new FormControl<number | null>(null),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('user', Validators.required)
  });

  // Cargar datos del usuario al iniciar
  ngOnInit(): void {
    if (this.userId) {
      this._userService.getUserById(this.userId).subscribe({
        next: (res: any) => {
          const user: User = res.data;
          if (user) {
            this.updateForm.patchValue({
              name: user.name,
              username: user.username,
              email: user.email,
              age: user.age || null,
              codigoempleado: user.codigoempleado || null,
              codigodepartamento: user.codigodepartamento || null,
              password: '',
              role: user.role || 'user'
            });
          }
        },
        error: (err) => {
          console.error('❌ Error al cargar usuario:', err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo cargar la información del usuario.',
          });
        },
      });
    }
  }

  // Enviar formulario (actualizar usuario)
  handleSubmit(): void {
    if (this.updateForm.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos obligatorios.',
      });
      return;
    }

    if (!this.userId) {
      Swal.fire({
        icon: 'error',
        title: 'Sin ID de usuario',
        text: 'No se puede actualizar sin un ID de usuario válido.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', this.updateForm.value.name || '');
    formData.append('username', this.updateForm.value.username || '');
    formData.append('email', this.updateForm.value.email || '');
    formData.append('age', this.updateForm.value.age?.toString() || '');
    formData.append('codigoempleado', this.updateForm.value.codigoempleado?.toString() || '');
    formData.append('codigodepartamento', this.updateForm.value.codigodepartamento?.toString() || '');
    formData.append('password', this.updateForm.value.password || '');
    formData.append('role', this.updateForm.value.role || 'user');

    this._userService.putUser(formData, this.userId).subscribe({
      next: (res: any) => {
        console.log('✅ Usuario actualizado:', res);
        Swal.fire({
          icon: 'success',
          title: 'Actualización exitosa',
          text: res.mensaje || 'El usuario ha sido actualizado correctamente.',
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        }).then(() => {
          this._router.navigate(['/usuarios']);
        });
      },
      error: (err: any) => {
        console.error('❌ Error al actualizar usuario:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.mensaje || 'Ocurrió un error al actualizar el usuario.',
        });
      },
    });
  }
}
