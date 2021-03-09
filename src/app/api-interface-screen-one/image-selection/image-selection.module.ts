import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ImageSelectionComponent } from './image-selection.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EasyDropdownModule } from 'src/app/shared/components/easy-dropdown/easy-dropdown.module';
import { EasyImagePreviewModule } from 'src/app/shared/components/easy-image-preview/easy-image-preview.module';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatDialogModule,
    EasyDropdownModule,
    EasyImagePreviewModule
  ],
  declarations: [
    ImageSelectionComponent,
  ], 
  exports: [
    ImageSelectionComponent
  ],
})
export class ImageSelectionModule { }
