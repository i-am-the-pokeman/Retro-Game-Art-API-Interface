import { NgModule } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { ApiInterfaceScreenOneComponent } from './api-interface-screen-one.component';
import { GameSelectionModule } from './game-selection/game-selection.module';
import { ImageSelectionModule } from './image-selection/image-selection.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCardModule } from '@angular/material/card';
import { NextBackStepperButtonsModule } from '../shared/components/next-back-stepper-buttons/next-back-stepper-buttons.module';
import { BrowserModule } from '@angular/platform-browser';
import { IntroductionModule } from './introduction/introduction.module';
import { EasyDividerModule } from '../shared/components/easy-divider/easy-divider.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EasyImagePreviewModule } from '../shared/components/easy-image-preview/easy-image-preview.module';

@NgModule({
  imports: [
    BrowserModule,
    IntroductionModule,
    GameSelectionModule,
    ImageSelectionModule,
    NextBackStepperButtonsModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    EasyImagePreviewModule,
    EasyDividerModule
  ],
  declarations: [
    ApiInterfaceScreenOneComponent,
  ], 
  exports: [
    ApiInterfaceScreenOneComponent
  ],
  providers: [
    TheGamesDBAPIService
  ]
})
export class ApiInterfaceScreenOneModule { }
