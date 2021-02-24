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

@NgModule({
  imports: [
    GameSelectionModule,
    ImageSelectionModule,
    NextBackStepperButtonsModule,
    MatStepperModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule
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
