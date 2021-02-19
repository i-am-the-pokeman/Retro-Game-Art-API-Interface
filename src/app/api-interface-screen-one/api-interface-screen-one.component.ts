import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
import { DropdownValue } from '../shared/forms/entities';
import { TheGamesDBAPIFormMapper } from '../shared/forms/TheGamesDBAPIFormMapper';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  platformsDropdownValues: DropdownValue[] = [];
  isDownloadButtonDisabled: boolean = false;

  // TODO: don't store the API key in this file lol
  readonly apikey: string = '';

  constructor(
    private theGamesDbAPIService: TheGamesDBAPIService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchPlatformsAndPopulateDropdown();
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

  fetchPlatformsAndPopulateDropdown() {
    let request: GETPlatformsRequest = {
      apikey: this.apikey
    };

    return this.theGamesDbAPIService.getAllPlatforms(request)
            .subscribe((response: GETPlatformsResponse) => {
              if (response?.data?.count) {
                this.platformsDropdownValues
                  = TheGamesDBAPIFormMapper.mapPlatformsToDropdownValues(
                                              Object.keys(response.data.platforms)
                                                      .map(key => response.data.platforms[key])
                                            );
              }
            });
  }

  fetchGamesByPlatformIdAndPopulateDropdown() {
    let request: GETGamesByPlatformIdRequest = {
      apikey: this.apikey,
      id: '1' // TODO: populate this based on the selection in the platforms dropdown
    }
    return this.theGamesDbAPIService.getGamesByPlatformId(request)
            .subscribe((response: GETGamesByPlatformIdResponse) => {
              // TODO: add drodpown and convert res to dropdown data
              console.log(response);
            });
  }



}
