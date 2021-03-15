import { Component, Input, OnInit } from '@angular/core';
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
export class ImageSelectionComponent {

  @Input() imageSelectionFormGroup: FormGroup;
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameImageTypeSelectionFormConfig.getFormConfigData());

  @Input()
  set gamesImagesDictionary(gamesImagesDictionary: GamesImagesDictionary) {
    this.gameImageTypeDropdownOptions
      = TheGamesDBAPIFormMapper.MapGameImagesDictionaryToImageTypeDropdownOptions(gamesImagesDictionary)
  }

  @Input() selectedIconUrl: string;
  @Input() selectedBannerUrl: string;

  readonly allowedImageTypes: string[] = [ImageTypes.banner, ImageTypes.boxart, ImageTypes.clearlogo, ImageTypes.screenshot, ImageTypes.titlescreen];
  gameImageTypeDropdownOptions: DropdownOption[];

  // Reveal to template
  readonly GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormGroup
  getIconFormControl(): FormControl { return this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon) as FormControl; }
  getBannerFormControl(): FormControl { return this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner) as FormControl; }
}
