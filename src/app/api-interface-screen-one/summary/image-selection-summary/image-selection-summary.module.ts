import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ImageSelectionSummaryComponent } from './image-selection-summary.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    ImageSelectionSummaryComponent,
  ], 
  exports: [
    ImageSelectionSummaryComponent
  ],
})
export class ImageSelectionSummaryModule { }
