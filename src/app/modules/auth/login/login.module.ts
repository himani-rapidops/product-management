import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AuthService } from '../auth.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    LoginRoutingModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService]
})
export class LoginModule { }

