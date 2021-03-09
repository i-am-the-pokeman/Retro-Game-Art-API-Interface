import { NgModule } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { ApiInterfaceScreenOneComponent } from './api-interface-screen-one.component';
import { GameSelectionModule } from './game-selection/game-selection.module';
import { ImageSelectionModule } from './image-selection/image-selection.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { NextBackStepperButtonsModule } from '../shared/components/next-back-stepper-buttons/next-back-stepper-buttons.module';
import { BrowserModule } from '@angular/platform-browser';
import { DisabledElementTooltipModule } from '../shared/components/disabled-element-tooltip/disabled-element-tooltip.module';
import { MatIconModule } from '@angular/material/icon';
import { IntroductionModule } from './introduction/introduction.module';
import { SummaryModule } from './summary/summary.module';

@NgModule({
  imports: [
    BrowserModule,
    IntroductionModule,
    GameSelectionModule,
    ImageSelectionModule,
    SummaryModule,
    NextBackStepperButtonsModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    DisabledElementTooltipModule,
    MatIconModule
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
