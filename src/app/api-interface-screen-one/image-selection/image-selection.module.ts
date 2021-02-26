import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';

import { DisabledElementTooltipModule } from '../../shared/components/disabled-element-tooltip/disabled-element-tooltip.module';
import { ImageSelectionComponent } from './image-selection.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatGridListModule,
    MatTooltipModule,
    MatIconModule,
    DisabledElementTooltipModule
  ],
  declarations: [
    ImageSelectionComponent,
  ], 
  exports: [
    ImageSelectionComponent
  ],
})
export class ImageSelectionModule { }
