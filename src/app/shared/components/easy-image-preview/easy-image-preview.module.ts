import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { EasyImagePreviewComponent } from './easy-image-preview.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule
  ],
  declarations: [
    EasyImagePreviewComponent
  ], 
  exports: [
    EasyImagePreviewComponent
  ],
})
export class EasyImagePreviewModule { }
