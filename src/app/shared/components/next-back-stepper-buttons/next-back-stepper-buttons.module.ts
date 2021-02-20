import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { NextBackStepperButtonsComponent } from './next-back-stepper-buttons.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  imports: [
    BrowserModule,
    MatButtonModule,
    MatStepperModule
  ],
  declarations: [
    NextBackStepperButtonsComponent,
  ], 
  exports: [
    NextBackStepperButtonsComponent
  ],
})
export class NextBackStepperButtonsModule { }
