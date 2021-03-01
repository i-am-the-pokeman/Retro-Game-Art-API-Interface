import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { APIUtils } from 'src/app/APIs/API-utils';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGameImagesByGameIdRequest, GETGameImagesByGameIdResponse, ImageBaseUrlMeta, ImageTypes } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { DropdownOption } from 'src/app/shared/forms/entities';
import { TheGamesDBAPIFormMapper } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { GameImageTypeSelectionControlName, GameImageTypeSelectionFormConfig } from '../services/form-data/image-selection-form-data';
import { FormConfigUtils } from 'src/app/shared/forms/form-config.utils';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ImageSelectionComponent implements OnInit {

  @Input() imageSelectionFormGroup: FormGroup;
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameImageTypeSelectionFormConfig.getFormConfigData());

  readonly allowedImageTypes: string[] = [ImageTypes.banner, ImageTypes.boxart, ImageTypes.clearlogo, ImageTypes.screenshot, ImageTypes.titlescreen];
  gameImageTypeDropdownOptions: DropdownOption[];

  // Reveal to template
  readonly GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  @Input()
  get gameSelectionId(): number { return this._gameSelectionId; }
  set gameSelectionId(id: number ) {
    this._gameSelectionId = id;
    
    // Fetch Initial set of domain data
    this.resetGameImageSelection();
    this.fetchGamesImagesAndPopulateDropdown();
  }
  private _gameSelectionId: number;

  @Output() baseImageUrlsUpdated = new EventEmitter<ImageBaseUrlMeta>()
  @Output() downloadButtonClicked = new EventEmitter<any>();

  private baseImageUrls: ImageBaseUrlMeta;
  selectedIconUrl: string;
  selectedBannerUrl: string;

  isDownloadButtonDisabled: boolean = true;

  constructor(private theGamesDbAPIService: TheGamesDBAPIService) { }

  ngOnInit() {
    // Form events
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon).valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          // Update UI
          this.isDownloadButtonDisabled = false;
          this.selectedIconUrl
            = APIUtils.buildFileUrl(this.baseImageUrls.thumb, gameImageSelection?.Value?.filename);
        }
      });
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner).valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          // Update UI
          this.isDownloadButtonDisabled = false;
          this.selectedBannerUrl
            = APIUtils.buildFileUrl(this.baseImageUrls.thumb, gameImageSelection?.Value?.filename);
        }
      });
  }

  // API Actions and Side Effects
  fetchGamesImagesAndPopulateDropdown() {
    if (!!this.gameSelectionId) {
      let request: GETGameImagesByGameIdRequest = {
        apikey: TheGamesDBAPIKey,
        games_id: this.gameSelectionId.toString()
      }
      this.theGamesDbAPIService.getGameImagesByGameIdRequest(request)
        .subscribe((response: GETGameImagesByGameIdResponse) => {
          if (response?.data?.count) {
            this.enableGameImageSelection();

            // Disable download button until a selection is made
            this.isDownloadButtonDisabled = true;

            // Populate Dropdowns based on what's available for the game
            this.gameImageTypeDropdownOptions
              = TheGamesDBAPIFormMapper.MapGameImagesDictionaryToImageTypeDropdownOptions(response.data.images)
                                       .filter((dropdownOption) => this.allowedImageTypes.includes(dropdownOption.Value.type));
            // Handle no available valid images
            if (!this.gameImageTypeDropdownOptions.length) {
              this.handleNoImageTypesAvailable();
            }

            // store imageUrlBases
            this.baseImageUrls = response.data?.base_url;
            // TODO: is there a way to remove this emitter?
            this.baseImageUrlsUpdated.emit(this.baseImageUrls);
          } else {
            this.handleNoImageTypesAvailable();
          }
        });
    }
  }

  private resetGameImageSelection() {
    // Reset Form
    if (!this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon)?.pristine)
      this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon).reset();
    if (!this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner)?.pristine)
      this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner).reset();

    // Reset previews
    this.selectedIconUrl = '';
    this.selectedBannerUrl = '';
  }

  private enableGameImageSelection() {
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon).enable();
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner).enable();
  }

  private handleNoImageTypesAvailable() {
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Icon).disable();
    this.imageSelectionFormGroup.get(GameImageTypeSelectionControlName.Banner).disable();
    // TODO: display error dialog
  }

  onDownloadClicked() {
    this.isDownloadButtonDisabled = true;
    this.downloadButtonClicked.emit();
  }
}
