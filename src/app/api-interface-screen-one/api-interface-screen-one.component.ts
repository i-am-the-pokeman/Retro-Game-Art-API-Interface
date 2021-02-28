import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { APIUtils } from '../APIs/API-utils';
import { GameImage, ImageBaseUrlMeta } from '../APIs/TheGamesDB/TheGamesDBAPIEntities';
import { DropdownOption } from '../shared/forms/entities';
import { ApiInterfaceGroupName, ApiInterfaceScreenOneFormService } from './services/api-interface-screen-one-form.service';
import { GameSelectionControlName } from './services/form-data/game-selection-form-data';
import { GameImageTypeSelectionControlName } from './services/form-data/image-selection-form-data';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.sass']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  formGroup = ApiInterfaceScreenOneFormService.getNewFormGroup();

  // TODO: emit game selection instead of number
  gameSelectionId: number;
  imageBaseUrls: ImageBaseUrlMeta;

  ApiInterfaceGroupName = ApiInterfaceGroupName;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.formGroup.get(ApiInterfaceGroupName.GameSelection)
                  .get(GameSelectionControlName.Game).valueChanges
      .subscribe((value: DropdownOption) => {
        if (!!value?.Value) {
          this.gameSelectionId = value.Value;
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
    // Tell main thread to download image
    let filesToDownload = [];
    let iconGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                  .get(GameImageTypeSelectionControlName.Icon)
                                                  ?.value?.Value;
    let bannerGameImage: GameImage = this.formGroup.get(ApiInterfaceGroupName.ImageTypeSelection)
                                                    .get(GameImageTypeSelectionControlName.Banner)
                                                    ?.value?.Value;
    if (iconGameImage?.id) {
      let url
        = APIUtils.buildFileUrl(this.imageBaseUrls.thumb, iconGameImage.filename)
      // TODO: make a util for filename builder
      let filenameSplit
        = iconGameImage.filename.split('/');
      let filename = filenameSplit[filenameSplit.length - 1];
      if (iconGameImage.side) {
        filename = iconGameImage.side + '-' + filename;
      }
      filesToDownload.push({url: url, filename: filename}) // TODO: type this you jackwagon
    }
    if (bannerGameImage?.id) {
      let url
        = APIUtils.buildFileUrl(this.imageBaseUrls.thumb, bannerGameImage.filename)
      let filenameSplit
        = bannerGameImage.filename.split('/');
      let filename = filenameSplit[filenameSplit.length - 1];
      if (bannerGameImage.side) {
        filename = bannerGameImage.side + '-' + filename;
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
