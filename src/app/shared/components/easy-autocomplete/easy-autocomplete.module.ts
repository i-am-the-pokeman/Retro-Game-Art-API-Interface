import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { EasyAutocompleteComponent } from './easy-autocomplete.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  declarations: [
    EasyAutocompleteComponent
  ], 
  exports: [
    EasyAutocompleteComponent
  ],
})
export class EasyAutocompleteModule { }
