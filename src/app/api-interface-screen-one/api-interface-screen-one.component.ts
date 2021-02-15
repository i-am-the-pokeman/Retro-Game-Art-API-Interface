import { Component, OnInit } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETPlatformsRequest } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  constructor(
    private theGamesDbAPIService: TheGamesDBAPIService
  ) { }

  ngOnInit(): void {
    // TODO: keep this uncommented until electron-store is implemented and I can make sure I don't use up my API limit
    //this.fetchPlatforms();

    let testURL = 'https://hips.hearstapps.com/countryliving.cdnds.net/17/47/2048x1365/gallery-1511194376-cavachon-puppy-christmas.jpg';
    ipc.send('download-image', testURL);

    ipc.on('download-image', (event: any, arg: any) => {
      console.log('Message received from main thread.')
    });
  }

  fetchPlatforms() {
    let request: GETPlatformsRequest = {
      apikey: 'fb1938f1103f7fd4c21f326a618183c3b928a2f3912082a432a706ef11b487c0'
    };

    // TODO: don't store the API key in this file lol
    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe(x => console.log(x));
  }

}
