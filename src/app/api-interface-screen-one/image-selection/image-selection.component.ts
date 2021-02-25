import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { APIUtils } from 'src/app/APIs/API-utils';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGameImagesByGameIdRequest, GETGameImagesByGameIdResponse, ImageBaseUrlMeta, ImageTypes } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { DropdownOption } from 'src/app/shared/forms/entities';
import { TheGamesDBAPIFormMapper } from 'src/app/shared/forms/TheGamesDBAPIFormMapper';
import { ImageSelectionUrls } from './entities';
import { GameImageTypeSelectionControlName, GameImageTypeSelectionFormConfig } from './form-config';

@Component({
  selector: 'image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class ImageSelectionComponent implements OnInit {

  readonly allowedImageTypes: string[] = [ImageTypes.banner, ImageTypes.boxart, ImageTypes.clearlogo, ImageTypes.screenshot, ImageTypes.titlescreen];
  gameImageTypeDropdownOptions: DropdownOption[];

  formGroup = GameImageTypeSelectionFormConfig.getFormGroup();
  readonly formConfigDataMap = GameImageTypeSelectionFormConfig.getFormConfigDataMap();

  // Reveal to template
  readonly GameImageTypeSelectionControlName = GameImageTypeSelectionControlName;

  @Input()
  get gameSelectionId(): number { return this._gameSelectionId; }
  set gameSelectionId(id: number ) {
    this._gameSelectionId = id;
    
    // Fetch Initial set of domain data
    this.fetchGamesImagesAndPopulateDropdown();
  }
  private _gameSelectionId: number;

  @Output() imagesSelected = new EventEmitter<ImageSelectionUrls>()
  @Output() downloadButtonClicked = new EventEmitter<any>();

  selectedIconUrl: string = '';
  selectedBannerUrl: string = '';
  private imageUrlBases: ImageBaseUrlMeta;

  isDownloadButtonDisabled: boolean = true;

  constructor(private theGamesDbAPIService: TheGamesDBAPIService) { }

  ngOnInit() {
    // Form events
    this.formGroup.controls[GameImageTypeSelectionControlName.Icon].valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          this.isDownloadButtonDisabled = false;
          this.selectedIconUrl = APIUtils.buildFileUrl(this.imageUrlBases.thumb, gameImageSelection?.Value?.filename);
          this.imagesSelected.emit({iconURL: this.selectedIconUrl, bannerURL: this.selectedBannerUrl});
        }
      });
    this.formGroup.controls[GameImageTypeSelectionControlName.Banner].valueChanges
      .subscribe((gameImageSelection: DropdownOption) => {
        if (gameImageSelection) {
          this.isDownloadButtonDisabled = false;
          this.selectedBannerUrl = APIUtils.buildFileUrl(this.imageUrlBases.thumb, gameImageSelection?.Value?.filename);
          this.imagesSelected.emit({iconURL: this.selectedIconUrl, bannerURL: this.selectedBannerUrl});
        }
      });
  }

  // TODO: we gotta split this function up
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
            // TODO: find data driven way to do this

            // Enable controls + reset controls that have been touched
            if (!this.formGroup.controls[GameImageTypeSelectionControlName.Icon].pristine) {
              this.formGroup.controls[GameImageTypeSelectionControlName.Icon].reset();
            }
            this.formGroup.controls[GameImageTypeSelectionControlName.Icon].enable();
            this.selectedIconUrl = '';
            if (!this.formGroup.controls[GameImageTypeSelectionControlName.Banner].pristine) {
              this.formGroup.controls[GameImageTypeSelectionControlName.Banner].reset();
            }
            this.formGroup.controls[GameImageTypeSelectionControlName.Banner].enable();
            this.selectedBannerUrl = '';

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
            this.imageUrlBases = response.data?.base_url;
          } else {
            this.handleNoImageTypesAvailable();
          }
        });
    }
  }

  onDownloadClicked() {
    this.isDownloadButtonDisabled = true;
    this.downloadButtonClicked.emit();
  }

  private handleNoImageTypesAvailable() {
    this.formGroup.controls[GameImageTypeSelectionControlName.Icon].disable();
    this.formGroup.controls[GameImageTypeSelectionControlName.Banner].disable();
    // TODO: display error dialog
  }

}
