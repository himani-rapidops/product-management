import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/auth.guard';
import { NotAuthGuard } from './shared/notAuth.guard';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    loadChildren: './modules/auth/login/login.module#LoginModule',
    canActivate: [NotAuthGuard]
  },
  {
    path: 'register',
    loadChildren: './modules/auth/register/register.module#RegisterModule',
    canActivate: [NotAuthGuard]
  },
  {
    path: 'product',
    loadChildren: './modules/product/product.module#ProductModule',
    canActivate: [AuthGuard]
  },
];

export const RouteModule = RouterModule.forRoot(routes);
