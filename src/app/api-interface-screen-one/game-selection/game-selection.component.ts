import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/forms/angular-material-autocomplete-utils';
import { DropdownOption } from 'src/app/shared/forms/entities';
import { FormConfigUtils } from 'src/app/shared/forms/form-config.utils';
import { TheGamesDBAPIFormMapper } from 'src/app/shared/forms/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from '../services/form-data/game-selection-form-data';

@Component({
  selector: 'game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.sass']
})
export class GameSelectionComponent implements OnInit {
  @Input() gameSelectionFormGroup: FormGroup;
  // TODO: we NEED to prevent the user from going to the next step when they provide incorrect values (ex: 'a', '123', etc.)
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameSelectionFormConfig.getFormConfigData());

  platformDropdownOptions: DropdownOption[] = [];
  filteredPlatformDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

  gamesDropdownOptions: DropdownOption[] = [];
  filteredGameDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

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
    this.gameSelectionFormGroup.get(GameSelectionControlName.Platform).valueChanges
      .subscribe(() => {
        this.fetchGamesByPlatformIdAndPopulateDropdown();
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
          this.platformDropdownOptions = TheGamesDBAPIFormMapper.MapPlatformsDictionaryToPlatformDropdownOptions(response.data.platforms);
          this.filteredPlatformDropdownOptions
            = AngularMaterialAutocompleteUtils.GetFilteredAutoCompleteOptions$(this.gameSelectionFormGroup.get(GameSelectionControlName.Platform), this.platformDropdownOptions);
        }
      });
  }

  fetchGamesByPlatformIdAndPopulateDropdown() {
    let platformId = this.gameSelectionFormGroup.get(GameSelectionControlName.Platform).value?.Value;
    if (!!platformId) {
      let request: GETGamesByPlatformIdRequest = {
        apikey: TheGamesDBAPIKey,
        id: platformId
      }
      this.theGamesDbAPIService.getGamesByPlatformId(request)
        .subscribe((response: GETGamesByPlatformIdResponse) => {
          if (response?.data?.count) {
            // clear dependant control TODO: do this in a data driven way
            if (!this.gameSelectionFormGroup.get(GameSelectionControlName.Game).pristine) {
              this.gameSelectionFormGroup.get(GameSelectionControlName.Game).reset();
            }
            // enable dependant control TODO: do this in a data driven way
            this.gameSelectionFormGroup.get(GameSelectionControlName.Game).enable();


            this.gamesDropdownOptions = TheGamesDBAPIFormMapper.MapGamesDictionaryToGameDrodpownOptions(response.data.games);
            // TODO: should I be concerned that a new observable is opened every time you switch the platform control's value?
            this.filteredGameDropdownOptions
               = AngularMaterialAutocompleteUtils.GetFilteredAutoCompleteOptions$(this.gameSelectionFormGroup.get(GameSelectionControlName.Game), this.gamesDropdownOptions);

          }
        });
    }
  }
  // END API Actions + Side Effects
}
