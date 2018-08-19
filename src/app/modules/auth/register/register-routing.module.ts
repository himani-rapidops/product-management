import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register.component';

/* Per module route functionality will decrease the load of app,
 It will call only one module when any path called */
const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RegisterRoutingModule { }
