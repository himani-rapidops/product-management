import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouteModule } from './app.route';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { SharedModule } from './shared/shared.module';
import { DataResolve } from './shared/data.resolve';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SharedModule,
    RouteModule
  ],
  providers: [DataResolve],
  bootstrap: [AppComponent]
})
export class AppModule { }
