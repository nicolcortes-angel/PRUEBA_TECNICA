import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/users.service';
import { User } from '../../interfaces/user';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';


// Si va hacer creacion (POST) o actualizacion (PUT), debe trabajar con formularios

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

//1. Injeccion de dependencia e inicializacion de variables

private _usersService = inject(UserService);
allusers: User[] = [];

//2. formgroups y formcontrols que necesite 
//...



//3. metodos que le permiten hacer las peticiones y gestionar respuestas
showUsers(){
  // hace la peticion get
  this._usersService.getUser().subscribe({
    next: (res :any) => {
      console.log(res);
      this.allusers = res.data
      console.log(this.allusers);
    },
    error: (err : any) => {
      console.error(err);
    },
  }
  ) ;
}


deleteUser(id : string){
  // hace la peticion delete
  console.log("Eliminar usuario:", id);

  this._usersService.deleteUser(id).subscribe({
   next: (res: any) => {
    console.log(res); 
    swal.fire({
  title: "Usuario eliminado",
  text: res.message,
  icon: "success"
});


    },
    error: (err: any) => {
      console.error(err);
    },
  }
  ) ;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
}

updateUser(id : string){
  // hace la peticion put
  console.log("Actualizar usuario:", id);
}


ngOnInit(): void {
  this.showUsers();
}
}

