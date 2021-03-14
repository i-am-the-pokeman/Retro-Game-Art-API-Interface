import { Component, Input, OnInit } from '@angular/core';
import { APIUtils } from 'src/app/APIs/API-utils';
import { GamesImagesDictionary, ImageBaseUrlMeta, ImageTypes } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { DropdownOption } from 'src/app/shared/form-helpers/entities/dropdown-option';
import { TheGamesDBAPIFormMapper } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { GameImageTypeSelectionControlName, GameImageTypeSelectionFormConfig } from '../services/form-data/image-selection-form-data';
import { FormConfigUtils } from 'src/app/shared/form-helpers/utils/form-config.utils';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.sass']
})
export class ImageSelectionComponent implements OnInit {

  @Input() imageSelectionFormGroup: FormGroup;
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameImageTypeSelectionFormConfig.getFormConfigData());

  @Input() imageBaseUrls: ImageBaseUrlMeta;

  @Input()
  set gamesImagesDictionary(gamesImagesDictionary: GamesImagesDictionary) {
    this.gameImageTypeDropdownOptions
      = TheGamesDBAPIFormMapper.MapGameImagesDictionaryToImageTypeDropdownOptions(gamesImagesDictionary)
  }

  selectedIconUrl: string;
  selectedBannerUrl: string;

  readonly allowedImageTypes: string[] = [ImageTypes.banner, ImageTypes.boxart, ImageTypes.clearlogo, ImageTypes.screenshot, ImageTypes.titlescreen];
  gameImageTypeDropdownOptions: DropdownOption[];

  // Reveal to template
  readonly GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  ngOnInit() {
    // Form events
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon).valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          this.selectedIconUrl
            = APIUtils.buildFileUrl(this.imageBaseUrls?.thumb, gameImageSelection?.Value?.filename);
        }
      });
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner).valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          this.selectedBannerUrl
            = APIUtils.buildFileUrl(this.imageBaseUrls?.thumb, gameImageSelection?.Value?.filename);
        }
      });
  }

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormGroup
  getIconFormControl(): FormControl { return this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon) as FormControl; }
  getBannerFormControl(): FormControl { return this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner) as FormControl; }
}
