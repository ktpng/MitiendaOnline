import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductTableComponent } from './products/admin/product-table/product-table.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'listado',
    component: ProductListComponent,
  },
  {
    path: 'administrador',
    component: ProductTableComponent,
    canActivate: [adminGuard],
  },
  {
    path: '',
    redirectTo: '/listado',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/listado',
  },
];
