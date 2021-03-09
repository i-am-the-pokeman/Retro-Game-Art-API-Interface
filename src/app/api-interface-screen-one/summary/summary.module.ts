import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GameSelectionSummaryModule } from '../game-selection-summary/game-selection-summary.module';
import { ImageSelectionSummaryModule } from '../image-selection-summary/image-selection-summary.module';
import { SummaryComponent } from './summary.component';


@NgModule({
  imports: [
    BrowserModule,
    GameSelectionSummaryModule,
    ImageSelectionSummaryModule
  ],
  declarations: [
    SummaryComponent,
  ], 
  exports: [
    SummaryComponent
  ],
})
export class SummaryModule { }
