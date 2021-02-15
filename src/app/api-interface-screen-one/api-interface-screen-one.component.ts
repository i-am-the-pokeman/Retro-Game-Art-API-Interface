import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETPlatformsRequest } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  isDownloadButtonDisabled: boolean = false;

  constructor(
    private theGamesDbAPIService: TheGamesDBAPIService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // TODO: keep this uncommented until electron-store is implemented and I can make sure I don't use up my API limit
    //this.fetchPlatforms();
  }

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

  fetchPlatforms() {
    let request: GETPlatformsRequest = {
      apikey: ''
    };

    // TODO: don't store the API key in this file lol
    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe(x => console.log(x));
  }

}
