import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameSelectionSummaryComponent } from './game-selection-summary.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    GameSelectionSummaryComponent,
  ], 
  exports: [
    GameSelectionSummaryComponent
  ],
})
export class GameSelectionSummaryModule { }
