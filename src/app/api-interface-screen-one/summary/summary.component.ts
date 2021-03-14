import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Game, GameImage, Platform } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent {
  @Input() platformSelection: Platform;
  @Input() gameSelection: Game;

  @Input() iconImage: GameImage;
  @Input() bannerImage: GameImage;

  @Output() downloadButtonClick = new EventEmitter<any>();

  game: Game;
  platform: Platform;

  onDownloadButtonClick() {
    this.downloadButtonClick.emit();
  }
}
