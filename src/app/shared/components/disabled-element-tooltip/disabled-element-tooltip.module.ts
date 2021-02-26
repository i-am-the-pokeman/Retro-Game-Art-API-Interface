import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { DisabledElementTooltipComponent } from './disabled-element-tooltip.component';

@NgModule({
  imports: [
    BrowserModule,
    MatTooltipModule
  ],
  declarations: [
    DisabledElementTooltipComponent
  ], 
  exports: [
    DisabledElementTooltipComponent
  ],
})
export class DisabledElementTooltipModule { }
