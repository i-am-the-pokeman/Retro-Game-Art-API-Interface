import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiInterfaceScreenOneModule } from './api-interface-screen-one/api-interface-screen-one.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Modules used throughout application
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,

    // UI Modules
    ApiInterfaceScreenOneModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
