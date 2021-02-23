import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DownloadSelectionComponent } from './download-selection.component';


@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    DownloadSelectionComponent,
  ], 
  exports: [
    DownloadSelectionComponent
  ],
})
export class DownloadSelectionModule { }
