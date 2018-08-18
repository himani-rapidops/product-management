import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteModule } from './app.route';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
