import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDividerModule } from '@angular/material/divider';
import { EasyDividerComponent } from './easy-divider.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatDividerModule
  ],
  declarations: [
    EasyDividerComponent
  ], 
  exports: [
    EasyDividerComponent
  ],
})
export class EasyDividerModule { }
