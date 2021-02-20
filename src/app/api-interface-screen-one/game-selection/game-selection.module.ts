import { NgModule } from '@angular/core';
import { GameSelectionComponent } from './game-selection.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  declarations: [
    GameSelectionComponent,
  ], 
  exports: [
    GameSelectionComponent
  ],
})
export class GameSelectionModule { }
