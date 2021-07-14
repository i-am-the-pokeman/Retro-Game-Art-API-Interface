import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DownloadImagesRequest } from 'electron/messages/DownloadImageRequests';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { APIUtils } from '../APIs/API-utils';
import { TheGamesDBAPIService } from '../APIs/TheGamesDB/TheGamesDBAPI.service';
import { Game, GameImage, GamesImagesDictionary, GETGameImagesByGameIdRequest, GETGameImagesByGameIdResponse, GETGamesByPlatformIdRequest, GETPlatformsRequest, GETPlatformsResponse, ImageBaseUrlMeta, Platform } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from '../APIs/TheGamesDB/TheGamesDBAPIKey';
import { AlertDialogComponent } from '../shared/components/alert-dialog/alert-dialog.component';
import { CreateOverlayRequest } from '../shared/services/ipc-services/build-overlay-entities';
import { BuildOverlaymapper as BuildOverlayMapper } from '../shared/services/ipc-services/build-overlay-mapper';
import { BuildOverlayService } from '../shared/services/ipc-services/build-overlay.service';
import { DownloadImagesMapper } from '../shared/services/ipc-services/download-images-mapper';
import { DownloadImagesService } from '../shared/services/ipc-services/download-images.service';
import { DictionaryUtils } from '../shared/utils/dictionary-utils';
import { ApiInterfaceGroupName, ApiInterfaceScreenOneFormService } from './services/api-interface-screen-one-form.service';
import { GameSelectionControlName } from './services/form-data/game-selection-form-data';
import { GameImageTypeSelectionControlName } from './services/form-data/image-selection-form-data';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.sass'],
  providers: [DownloadImagesService, BuildOverlayService]
})
export class ApiInterfaceScreenOneComponent implements OnInit, OnDestroy {

  formGroup = ApiInterfaceScreenOneFormService.getNewFormGroup();

  platforms: Platform[] = [];;
  games: Game[] = [];
  gamesImagesDictionary: GamesImagesDictionary = {};

  imageBaseUrls: ImageBaseUrlMeta;
  selectedIconUrl: string;
  selectedBannerUrl: string;
  selectedClearlogoUrl: string;

  overlayBuffer: string;

  isDownloadButtonDisabled: boolean = true; // TODO: this component may not be the right place for this...

  // Expose to DOM
  ApiInterfaceGroupName = ApiInterfaceGroupName;
  GameSelectionControlName = GameSelectionControlName;
  GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  private stop$ = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private theGamesDbAPIService: TheGamesDBAPIService,
    private downloadImagesService: DownloadImagesService,
    private buildOverlayService: BuildOverlayService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // Grab initial set of domain data
    this.fetchPlatforms();

    // Listen for form changes
    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Platform)
                  .valueChanges
      .pipe(takeUntil(this.stop$))
      .subscribe((value) => {
        // Fetch domain data for next input
        if (value) {
          let platformId = this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                                          .get(GameSelectionControlName.Platform)
                                          .value?.Value?.id;
          this.fetchGames(platformId);
        }

        // Progressive Disclosure
        (!!value)
          ? this.formGroup.get(ApiInterfaceGroupName.GameSelection).get(GameSelectionControlName.Game).enable()
          : this.formGroup.get(ApiInterfaceGroupName.GameSelection).get(GameSelectionControlName.Game).disable();
        if (!value) {
          this.formGroup.get(ApiInterfaceGroupName.GameSelection).get(GameSelectionControlName.Game).reset();
          this.games = [];
        }
      });

    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Game)
                  .valueChanges
      .pipe(takeUntil(this.stop$))
      .subscribe((value) => {
        // Fetch domain data for next input
        let gameId = this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                                    .get(GameSelectionControlName.Game)
                                    .value?.Value?.id;
        this.fetchGamesImages(gameId);

        // Progressive Disclosure
        (!!value)
          ? this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection).enable()
          : this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection).disable();
        if (!value) {
          this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection).reset();
          this.gamesImagesDictionary = {};
        }
      });

    this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                  .valueChanges
      .pipe(takeUntil(this.stop$))
      .subscribe(({icon, banner, clearlogo}) => {
        // Progressive Disclosure
        this.isDownloadButtonDisabled = !icon && !banner; // TODO: there's a clearer way to do this check

        // Side Effects
        this.selectedIconUrl = (!!icon)
          ? APIUtils.buildFileUrl(this.imageBaseUrls?.thumb, icon?.Value?.filename)
          : '';
        this.selectedBannerUrl = (!!banner) 
          ? APIUtils.buildFileUrl(this.imageBaseUrls?.thumb, banner?.Value?.filename)
          : '';
        this.selectedClearlogoUrl = (!!clearlogo) 
          ? APIUtils.buildFileUrl(this.imageBaseUrls?.thumb, clearlogo?.Value?.filename)
          : '';
      });
    
    ipc.on('build-overlay', (event: string, args: any) => {
      this.ngZone.run(() => {
        this.overlayBuffer = args;
        this.openAlertDialog('hello world');
      });
    })

  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  fetchPlatforms() {
    let request: GETPlatformsRequest = {
      apikey: TheGamesDBAPIKey
    };

    this.theGamesDbAPIService.getAllPlatforms(request)
      .pipe(takeUntil(this.stop$))
      .subscribe((response: GETPlatformsResponse) => {
        // Store response data
        if (response?.data?.count) {
          this.platforms = DictionaryUtils.GetDictionaryValues(response.data.platforms);
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
      this.theGamesDbAPIService.getAllGamesByPlatformId(request)
        .pipe(takeUntil(this.stop$))
        .subscribe((response: Game[]) => { 
          this.games = response;
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
        .pipe(takeUntil(this.stop$))
        .subscribe((response: GETGameImagesByGameIdResponse) => {
          // Store response data
          if (response?.data?.count) {
            this.gamesImagesDictionary = response.data.images;
          }

          // Side effects
          this.imageBaseUrls = response?.data?.base_url;
        }, (error) => {
          this.openAlertDialog(error);
        });
    }
  }

  downloadImages() {
    let downloadImagesRequest: DownloadImagesRequest = {
      FilesToDownload: []
    };
    let iconGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                  .get(GameImageTypeSelectionControlName.Icon)
                                                  ?.value?.Value;
    let bannerGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                    .get(GameImageTypeSelectionControlName.Banner)
                                                    ?.value?.Value;
    let clearlogoGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                        .get(GameImageTypeSelectionControlName.Clearlogo)
                                                        ?.value?.Value;
    if (iconGameImage?.id) {
      let fileToDownload = DownloadImagesMapper.MapGameImageToFileToDownload(this.imageBaseUrls, iconGameImage, 'icon');
      downloadImagesRequest.FilesToDownload.push(fileToDownload);
    }
    if (bannerGameImage?.id) {
      let fileToDownload = DownloadImagesMapper.MapGameImageToFileToDownload(this.imageBaseUrls, bannerGameImage, 'banner');
      downloadImagesRequest.FilesToDownload.push(fileToDownload);
    }
    if (clearlogoGameImage?.id) {
      let fileToDownload = DownloadImagesMapper.MapGameImageToFileToDownload(this.imageBaseUrls, clearlogoGameImage, 'clearlogo');
      downloadImagesRequest.FilesToDownload.push(fileToDownload);
    }
    this.downloadImagesService.DownloadImages(downloadImagesRequest);
  }

  buildOverlayPreview() {
    let buildOverlayRequest: CreateOverlayRequest = {
      OverlayPieces: []
    };
    let iconGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                  .get(GameImageTypeSelectionControlName.Icon)
                                                  ?.value?.Value;
    let bannerGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                    .get(GameImageTypeSelectionControlName.Banner)
                                                    ?.value?.Value;
    let clearlogoGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                    .get(GameImageTypeSelectionControlName.Clearlogo)
                                                    ?.value?.Value;
    
    if (iconGameImage?.id) {
      let overlayPiece = BuildOverlayMapper.MapGameImageToOverlayPiece(this.imageBaseUrls, iconGameImage);
      buildOverlayRequest.OverlayPieces.push(overlayPiece);
    }
    if (bannerGameImage?.id) {
      let overlayPiece = BuildOverlayMapper.MapGameImageToOverlayPiece(this.imageBaseUrls, bannerGameImage);
      buildOverlayRequest.OverlayPieces.push(overlayPiece);
    }
    if (clearlogoGameImage?.id) {
      let overlayPiece = BuildOverlayMapper.MapGameImageToOverlayPiece(this.imageBaseUrls, clearlogoGameImage);
      buildOverlayRequest.OverlayPieces.push(overlayPiece);
    }

    this.buildOverlayService.BuildOverlayPreview(buildOverlayRequest);
  }

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormGroup
  getGameSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.GameSelection) as FormGroup; }
  getImageTypeSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection) as FormGroup; }
  
  private openAlertDialog(message: string) {
    console.log('openAlertDialog');
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {message: message};

    this.dialog.open(AlertDialogComponent, dialogConfig);

    this.dialog.afterAllClosed.subscribe(
      () => console.log('well it closed I guess')
    )
  }
}
