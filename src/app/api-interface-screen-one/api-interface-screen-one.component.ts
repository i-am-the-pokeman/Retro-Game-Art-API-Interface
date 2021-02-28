import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { APIUtils } from '../APIs/API-utils';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { ImageSelectionResults } from './image-selection/entities';
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

  // TODO: emit game selection instead of number
  gameSelectionId: number;
  imageSelectionResults: ImageSelectionResults;

  constructor(private cdr: ChangeDetectorRef) { }

  setGameSelectionId(gameSelectionId: number) {
    this.gameSelectionId = gameSelectionId;
  }

  setImageSelectionUrls(imageSelections: ImageSelectionResults) {
    this.imageSelectionResults = Object.assign({}, imageSelections);
  }

  downloadImages() {
    // Tell main thread to download image
    let filesToDownload = [];
    if (this.imageSelectionResults?.icon?.id) {
      let url
        = APIUtils.buildFileUrl(this.imageSelectionResults.baseImageUrls.thumb, this.imageSelectionResults.icon.filename)
      // TODO: make a util for filename builder
      let filenameSplit
        = this.imageSelectionResults.icon.filename.split('/');
      let filename = filenameSplit[filenameSplit.length - 1];
      if (this.imageSelectionResults.icon.side) {
        filename = this.imageSelectionResults.icon.side + '-' + filename;
      }
      filesToDownload.push({url: url, filename: filename}) // TODO: type this you jackwagon
    }
    if (this.imageSelectionResults?.banner?.id) {
      let url
        = APIUtils.buildFileUrl(this.imageSelectionResults.baseImageUrls.thumb, this.imageSelectionResults.banner.filename)
      let filenameSplit
        = this.imageSelectionResults.banner.filename.split('/');
      let filename = filenameSplit[filenameSplit.length - 1];
      if (this.imageSelectionResults.banner.side) {
        filename = this.imageSelectionResults.banner.side + '-' + filename;
      }
      filesToDownload.push({url: url, filename: filename})
    }
    ipc.send('download-images', filesToDownload)

    // Get status of download (success/failure)
    ipc.on('download-image', (event: any, arg: any) => {
      this.cdr.detectChanges();
      console.log('Message received from main thread.')
    });
  }
}
