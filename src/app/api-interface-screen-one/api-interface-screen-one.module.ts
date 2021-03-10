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
import { SummaryModule } from './summary/summary.module';
import { EasyDividerModule } from '../shared/components/easy-divider/easy-divider.module';

@NgModule({
  imports: [
    BrowserModule,
    IntroductionModule,
    GameSelectionModule,
    ImageSelectionModule,
    SummaryModule,
    NextBackStepperButtonsModule,
    MatStepperModule,
    MatCardModule,
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
