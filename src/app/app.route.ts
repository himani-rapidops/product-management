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
];

export const RouteModule = RouterModule.forRoot(routes);
