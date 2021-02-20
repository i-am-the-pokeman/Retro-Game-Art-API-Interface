import { NgModule } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { ApiInterfaceScreenOneComponent } from './api-interface-screen-one.component';
import { DownloadSelectionModule } from './download-selection/download-selection.module';
import { GameSelectionModule } from './game-selection/game-selection.module';
import { ImageSelectionModule } from './image-selection/image-selection.module';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    GameSelectionModule,
    ImageSelectionModule,
    DownloadSelectionModule,
    MatStepperModule,
    MatButtonModule
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
