import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

/* Per module route functionality will decrease the load of app,
 It will call only one module when any path called */

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginRoutingModule {}
