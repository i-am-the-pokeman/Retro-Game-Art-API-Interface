import { Component, Input, OnInit } from '@angular/core';
import { Game, Platform } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';

@Component({
  selector: 'game-selection-summary',
  templateUrl: './game-selection-summary.component.html',
  styleUrls: ['./game-selection-summary.component.sass']
})
export class GameSelectionSummaryComponent {

  @Input() platform: Platform = null;
  @Input() game: Game = null;

  isDataReady(): boolean {
    console.log('isDataReady:')
    console.log(this.platform)
    return !!this.platform && !!this.game;
  }
}
