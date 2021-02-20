import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DownloadSelectionComponent } from './download-selection/download-selection.component';
import { GameSelectionComponent } from './game-selection/game-selection.component';
import { ImageSelectionUrls } from './image-selection/entities';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  @ViewChild(GameSelectionComponent, { static: true }) gameSelectionComponent: GameSelectionComponent;
  @ViewChild(ImageSelectionComponent) imageSelectionComponent: ImageSelectionComponent;
  @ViewChild(DownloadSelectionComponent) downloadSelectionComponent: DownloadSelectionComponent;

  gameSelectionId: number;
  imageSelectionUrls: ImageSelectionUrls;

  // TODO: move to download-selection component
  isDownloadButtonDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {}

  setGameSelectionId(gameSelectionId: number) {
    this.gameSelectionId = gameSelectionId;
  }

  setImageSelectionUrls(imageSelections: ImageSelectionUrls) {
    this.imageSelectionUrls = Object.assign({}, imageSelections);
  }

  // TODO: move to download-selection component
  downloadImages() {
    // Tell main thread to download image
    this.isDownloadButtonDisabled = true;
    let testURL = 'https://hips.hearstapps.com/countryliving.cdnds.net/17/47/2048x1365/gallery-1511194376-cavachon-puppy-christmas.jpg';
    ipc.send('download-image', testURL);

    // Get status of download (success/failure)
    ipc.on('download-image', (event: any, arg: any) => {
      this.isDownloadButtonDisabled = false;
      this.cdr.detectChanges();
      console.log('Message received from main thread.')
    });
  }
}
