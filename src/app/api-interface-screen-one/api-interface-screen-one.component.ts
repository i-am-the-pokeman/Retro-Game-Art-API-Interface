import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { ImageSelectionUrls } from './image-selection/entities';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.sass']
})
export class ApiInterfaceScreenOneComponent {

  // TODO: create a new injectable service that initializes these formGroups and makes them available so we don't have to ViewChild
  @ViewChild(GameSelectionComponent, { static: true }) gameSelectionComponent: GameSelectionComponent;
  @ViewChild(ImageSelectionComponent, { static: true }) imageSelectionComponent: ImageSelectionComponent;

  gameSelectionId: number;
  imageSelectionUrls: ImageSelectionUrls;

  constructor(private cdr: ChangeDetectorRef) { }

  setGameSelectionId(gameSelectionId: number) {
    this.gameSelectionId = gameSelectionId;
  }

  setImageSelectionUrls(imageSelections: ImageSelectionUrls) {
    this.imageSelectionUrls = Object.assign({}, imageSelections);
  }

  downloadImages() {
    // Tell main thread to download image
    if (this.imageSelectionUrls?.iconURL) ipc.send('download-image', this.imageSelectionUrls.iconURL);
    if (this.imageSelectionUrls?.bannerURL) ipc.send('download-image', this.imageSelectionUrls.bannerURL);

    // Get status of download (success/failure)
    ipc.on('download-image', (event: any, arg: any) => {
      this.cdr.detectChanges();
      console.log('Message received from main thread.')
    });
  }
}
