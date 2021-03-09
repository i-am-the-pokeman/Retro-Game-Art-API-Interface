import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { GameSelectionSummaryModule } from '../game-selection-summary/game-selection-summary.module';
import { ImageSelectionSummaryModule } from '../image-selection-summary/image-selection-summary.module';
import { SummaryComponent } from './summary.component';


@NgModule({
  imports: [
    BrowserModule,
    GameSelectionSummaryModule,
    ImageSelectionSummaryModule,
    MatButtonModule,
    MatIconModule
  ],
  declarations: [
    SummaryComponent,
  ], 
  exports: [
    SummaryComponent
  ],
})
export class SummaryModule { }
