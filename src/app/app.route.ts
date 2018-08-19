import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: './modules/auth/login/login.module#LoginModule'
  },
  {
    path: 'register',
    loadChildren: './modules/auth/register/register.module#RegisterModule'
  },
];

export const RouteModule = RouterModule.forRoot(routes);
