import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiInterfaceScreenOneModule } from './api-interface-screen-one/api-interface-screen-one.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Modules used throughout application
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    // UI Modules
    ApiInterfaceScreenOneModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
