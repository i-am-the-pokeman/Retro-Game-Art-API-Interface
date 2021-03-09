import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApiInterfaceScreenOneModule } from './api-interface-screen-one/api-interface-screen-one.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
  providers: [
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {width: '250px'}}, // default dialog options
    {provide: STEPPER_GLOBAL_OPTIONS, useValue: { displayDefaultIndicatorType: false }} // allow icon override for stepper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
