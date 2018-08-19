import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';

@NgModule({
    imports: [
        HttpModule,
        FormsModule,
        CommonModule,
        RegisterRoutingModule
    ],
    declarations: [RegisterComponent],
    providers: []
})
export class RegisterModule { }