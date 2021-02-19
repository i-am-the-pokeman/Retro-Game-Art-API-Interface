import { NgModule } from '@angular/core';
import { GameSelectionComponent } from './game-selection.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    MatCardModule
  ],
  declarations: [
    GameSelectionComponent,
  ], 
  exports: [
    GameSelectionComponent
  ],
})
export class GameSelectionModule { }
