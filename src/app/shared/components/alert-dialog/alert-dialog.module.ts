import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { AlertDialogComponent } from './alert-dialog.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    BrowserModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  declarations: [
    AlertDialogComponent,
  ], 
  exports: [
    AlertDialogComponent
  ]
})
export class AlertDialogModule { }
