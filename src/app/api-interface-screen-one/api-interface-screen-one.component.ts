import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GameImage, ImageBaseUrlMeta } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIFormMapper } from '../APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { DropdownOption } from '../shared/form-helpers/entities';
import { DownloadImagesService } from '../shared/services/ipc-services/download-images.service';
import { ApiInterfaceGroupName, ApiInterfaceScreenOneFormService } from './services/api-interface-screen-one-form.service';
import { GameSelectionControlName } from './services/form-data/game-selection-form-data';
import { GameImageTypeSelectionControlName } from './services/form-data/image-selection-form-data';

// TODO: move API requests up to this orchestrator component
// TODO: move download button to this orchestrator component
@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.sass'],
  providers: [DownloadImagesService]
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  formGroup = ApiInterfaceScreenOneFormService.getNewFormGroup();

  gameSelectionId: number;
  imageBaseUrls: ImageBaseUrlMeta;

  ApiInterfaceGroupName = ApiInterfaceGroupName;

  constructor(private downloadImagesService: DownloadImagesService) { }

  ngOnInit() {
    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Game).valueChanges
      .subscribe((value: DropdownOption) => {
        if (!!value?.Value) {
          this.gameSelectionId = value.Value?.id;
        }
      });
  }

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormGroup
  getGameSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.GameSelection) as FormGroup; }
  getImageTypeSelectionFormGroup(): FormGroup { return this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection) as FormGroup; }

  setImageSelectionUrls(imageBaseUrls: ImageBaseUrlMeta) {
    this.imageBaseUrls = Object.assign({}, imageBaseUrls);
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
}
