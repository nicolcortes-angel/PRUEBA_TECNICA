import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { UpdateFormUserComponent } from '../../../components/updateformuser/updateformuser.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UpdateFormUserComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  private _userService = inject(UserService);

  allUsers: User[] = [];
  selectedUserId: string | null = null;
  showUpdateForm = false;

  ngOnInit(): void {
    this.loadUsers();
  }

  // Obtener todos los usuarios
  loadUsers(): void {
    this._userService.getUser().subscribe({
      next: (res: any) => {
        console.log('✅ Respuesta completa del backend:', res);
        this.allUsers = res.data || res.users || res;
        console.log('Usuarios cargados:', this.allUsers);
      },
      error: (err: any) => {
        console.error('❌ Error al obtener usuarios:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar usuarios',
          text: 'No se pudieron obtener los usuarios desde el servidor.'
        });
      }
    });
  }

  // Eliminar usuario
  deleteUser(id: string): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará al usuario de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe({
          next: (res: any) => {
            Swal.fire('Eliminado', res.mensaje, 'success');
            this.loadUsers();
          },
          error: (err: any) => {
            console.error('❌ Error al eliminar usuario:', err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.error?.mensaje || 'No se pudo eliminar el usuario.'
            });
          }
        });
      }
    });
  }

  // Mostrar formulario de actualización
  updateUsersInfo(id: string): void {
    this.selectedUserId = id;
    this.showUpdateForm = true;
  }

  // Ocultar formulario al finalizar
  closeUpdateForm(): void {
    this.showUpdateForm = false;
    this.selectedUserId = null;
    this.loadUsers();
  }
}
