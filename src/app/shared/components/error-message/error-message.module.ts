import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorMessageComponent } from './error-message.component';

@NgModule({
  imports: [
    BrowserModule,
    MatIconModule
  ],
  declarations: [
    ErrorMessageComponent,
  ], 
  exports: [
    ErrorMessageComponent
  ],
})
export class ErrorMessageModule { }
