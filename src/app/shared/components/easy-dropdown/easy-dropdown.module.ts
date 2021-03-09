import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { EasyDropdownComponent } from './easy-dropdown.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule
  ],
  declarations: [
    EasyDropdownComponent
  ], 
  exports: [
    EasyDropdownComponent
  ],
})
export class EasyDropdownModule { }
