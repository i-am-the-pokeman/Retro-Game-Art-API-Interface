import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { GameImage, GamesDictionary, GamesImagesDictionary, GETGameImagesByGameIdRequest, GETGameImagesByGameIdResponse, GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse, ImageBaseUrlMeta, Platform, PlatformsDictionary } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIFormMapper } from '../APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { TheGamesDBAPIKey } from '../APIs/TheGamesDB/TheGamesDBAPIKey';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { DownloadImagesService } from '../shared/services/ipc-services/download-images.service';
import { ApiInterfaceGroupName, ApiInterfaceScreenOneFormService } from './services/api-interface-screen-one-form.service';
import { GameSelectionControlName } from './services/form-data/game-selection-form-data';
import { GameImageTypeSelectionControlName } from './services/form-data/image-selection-form-data';

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.sass'],
  providers: [DownloadImagesService]
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  formGroup = ApiInterfaceScreenOneFormService.getNewFormGroup();

  platformsDictionary: PlatformsDictionary = {};
  gamesDictionary: GamesDictionary = {};
  gamesImagesDictionary: GamesImagesDictionary = {};

  imageBaseUrls: ImageBaseUrlMeta;

  // Expose to DOM
  ApiInterfaceGroupName = ApiInterfaceGroupName;
  GameSelectionControlName = GameSelectionControlName;
  GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  constructor(
    private dialog: MatDialog,
    private theGamesDbAPIService: TheGamesDBAPIService,
    private downloadImagesService: DownloadImagesService
  ) { }

  ngOnInit() {
    // Form Pipeline
    this.fetchPlatforms();

    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Platform)
                  .valueChanges
      .subscribe((value) => {
        let platformId = this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                                        .get(GameSelectionControlName.Platform)
                                        .value?.Value.id;
        this.fetchGames(platformId);

        (!!value)
          ? this.formGroup.get(ApiInterfaceGroupName.GameSelection).get(GameSelectionControlName.Game).enable()
          : this.formGroup.get(ApiInterfaceGroupName.GameSelection).get(GameSelectionControlName.Game).disable();

        // TODO: reset image previews
      });

    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Game)
                  .valueChanges
      .subscribe(() => {
        let gameId = this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                                    .get(GameSelectionControlName.Game)
                                    .value?.Value.id;
        this.fetchGamesImages(gameId);
      });
  }

  fetchPlatforms() {
    let request: GETPlatformsRequest = {
      apikey: TheGamesDBAPIKey
    };

    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe((response: GETPlatformsResponse) => {
        if (response?.data?.count) {
          this.platformsDictionary = response.data.platforms;
        }
      }, (error) => {
        this.openAlertDialog(error);
      });
  }

  fetchGames(platformSelectionId: number) {
    if (!!platformSelectionId) {
      let request: GETGamesByPlatformIdRequest = {
        apikey: TheGamesDBAPIKey,
        id: platformSelectionId.toString()
      }
      this.theGamesDbAPIService.getGamesByPlatformId(request)
        .subscribe((response: GETGamesByPlatformIdResponse) => {
          if (response?.data?.count) {
            this.gamesDictionary = response.data.games;
          }
        }, (error) => {
          this.openAlertDialog(error);
        });
    }
  }

  fetchGamesImages(gameSelectionId: number) {
    if (gameSelectionId) {
      let request: GETGameImagesByGameIdRequest = {
        apikey: TheGamesDBAPIKey,
        games_id: gameSelectionId.toString()
      }
      this.theGamesDbAPIService.getGameImagesByGameIdRequest(request)
        .subscribe((response: GETGameImagesByGameIdResponse) => {
          this.imageBaseUrls = response?.data?.base_url;
          if (response?.data?.count) {
            this.gamesImagesDictionary = response.data.images;
          }
        }, (error) => {
          this.openAlertDialog(error);
        });
    }
  }

  downloadImages() {
    let filesToDownload = [];
    let iconGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                  .get(GameImageTypeSelectionControlName.Icon)
                                                  ?.value?.Value;
    let bannerGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                    .get(GameImageTypeSelectionControlName.Banner)
                                                    ?.value?.Value;
    if (iconGameImage?.id) {
      let fileToDownload = TheGamesDBAPIFormMapper.MapGameImageToFileToDownload(this.imageBaseUrls, iconGameImage, 'icon');
      filesToDownload.push(fileToDownload);
    }
    if (bannerGameImage?.id) {
      let fileToDownload = TheGamesDBAPIFormMapper.MapGameImageToFileToDownload(this.imageBaseUrls, bannerGameImage, 'banner');
      filesToDownload.push(fileToDownload);
    }
    this.downloadImagesService.DownloadImages(filesToDownload);
  }

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormGroup
  getGameSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.GameSelection) as FormGroup; }
  getImageTypeSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection) as FormGroup; }
  
  private openAlertDialog(message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {message: message}
    });
  }
}
