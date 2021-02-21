import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/forms/angular-material-autocomplete-utils';
import { DropdownOption } from 'src/app/shared/forms/entities';
import { TheGamesDBAPIFormMapper } from 'src/app/shared/forms/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from './form-config';

@Component({
  selector: 'game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.less']
})
export class GameSelectionComponent implements OnInit {
  @Output() gameSelected = new EventEmitter<number>();

  platformDropdownOptions: DropdownOption[] = [];
  filteredPlatformDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

  gamesDropdownOptions: DropdownOption[] = [];
  filteredGameDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

  formGroup = GameSelectionFormConfig.getFormGroup();
  readonly formConfigDataMap = GameSelectionFormConfig.getFormConfigDataMap();

  // Reveal to template
  readonly GameSelectionControlName = GameSelectionControlName;
  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;

  constructor(
    private theGamesDbAPIService: TheGamesDBAPIService
  ) { }

  ngOnInit() {
    // Fetch initial set of domain data
    this.fetchPlatformsAndPopulateDropdown();

    // Form events
    this.formGroup.controls[GameSelectionControlName.Platform].valueChanges
      .subscribe(() => {
        this.fetchGamesByPlatformIdAndPopulateDropdown();
      });

    this.formGroup.controls[GameSelectionControlName.Game].valueChanges
      .subscribe((value) => {
        if (!!value?.Value) {
          this.gameSelected.emit(value?.Value);
        }
      });
  }

  // API Actions + Side Effects
  fetchPlatformsAndPopulateDropdown() {
    let request: GETPlatformsRequest = {
      apikey: TheGamesDBAPIKey
    };

    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe((response: GETPlatformsResponse) => {
        if (response?.data?.count) {
          this.platformDropdownOptions = TheGamesDBAPIFormMapper.MapPlatformsDictionaryToDropdownOptions(response.data.platforms);
          this.filteredPlatformDropdownOptions
            = AngularMaterialAutocompleteUtils.GetFilteredAutoCompleteOptions$(this.formGroup.controls[GameSelectionControlName.Platform], this.platformDropdownOptions);
        }
      });
  }

  fetchGamesByPlatformIdAndPopulateDropdown() {
    let platformId = this.formGroup.controls[GameSelectionControlName.Platform].value?.Value;
    if (!!platformId) {
      let request: GETGamesByPlatformIdRequest = {
        apikey: TheGamesDBAPIKey,
        id: platformId
      }
      this.theGamesDbAPIService.getGamesByPlatformId(request)
        .subscribe((response: GETGamesByPlatformIdResponse) => {
          if (response?.data?.count) {
            // clear dependant control TODO: do this in a data driven way
            if (!this.formGroup.controls[GameSelectionControlName.Game].pristine) {
              this.formGroup.controls[GameSelectionControlName.Game].reset();
            }
            // enable dependant control TODO: do this in a data driven way
            this.formGroup.controls[GameSelectionControlName.Game].enable();

            this.gamesDropdownOptions = TheGamesDBAPIFormMapper.MapGamesDictionaryToDrodpownOptions(response.data.games);
            // TODO: should I be concerned that a new observable is opened every time you switch the platform control's value?
            this.filteredGameDropdownOptions
               = AngularMaterialAutocompleteUtils.GetFilteredAutoCompleteOptions$(this.formGroup.controls[GameSelectionControlName.Game], this.gamesDropdownOptions);
            console.log(this.gamesDropdownOptions);

            // TODO: make newly enabled form input ripple
          }
        });
    }
  }
  // END API Actions + Side Effects
}
