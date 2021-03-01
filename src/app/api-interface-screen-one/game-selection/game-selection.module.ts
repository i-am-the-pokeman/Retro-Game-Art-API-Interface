import { NgModule } from '@angular/core';
import { GameSelectionComponent } from './game-selection.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EasyAutocompleteModule } from 'src/app/shared/components/easy-autocomplete/easy-autocomplete.module';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    EasyAutocompleteModule
  ],
  declarations: [
    GameSelectionComponent,
  ], 
  exports: [
    GameSelectionComponent
  ],
})
export class GameSelectionModule { }
