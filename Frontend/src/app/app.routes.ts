import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ProductsComponent } from './pages/products/products.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { InventoryComponent } from './pages/inventory/inventory.component';


//impoirtan el guardian y decirles lasrutas protegidas
import { authguardGuard } from './guards/authguard.guard';





//importar el guardian y espicificar que rutas seran protegidas



export const routes: Routes = [

       {path:'', component: HomeComponent, title: 'Inicio'},

    {
    path: 'dashboard',
    component: AdminComponent,
    title: 'Dashboard',
    canActivate: [authguardGuard],
    canActivateChild: [authguardGuard],
    children: [
      { path: '', component: UsersComponent, title: 'Gestión de Usuarios' },
      { path: 'inventory', component: InventoryComponent, title: 'Inventario' }
    ]
  },

    
    {path:'admin', component: AdminComponent, title: 'Dashboard', canActivate: [authguardGuard]},
    {path:'login', component: LoginComponent, title: 'Inicio Sesion'},
    {path:'products', component: ProductsComponent, title: 'Productos'},
    {path:'registro', component: RegisterComponent, title: 'Registro'},
    {path:'**', component: NotFoundComponent, title: '404'}, //siempre debe ir al final 
];

