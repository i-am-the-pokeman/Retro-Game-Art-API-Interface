import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/form-helpers/angular-material-autocomplete-utils';
import { DropdownOption } from 'src/app/shared/form-helpers/entities';
import { FormConfigUtils } from 'src/app/shared/form-helpers/form-config.utils';
import { TheGamesDBAPIFormMapper } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from '../services/form-data/game-selection-form-data';

@Component({
  selector: 'game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.sass']
})
export class GameSelectionComponent implements OnInit {
  @Input() gameSelectionFormGroup: FormGroup;
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameSelectionFormConfig.getFormConfigData());

  platformDropdownOptions: DropdownOption[] = [];
  gamesDropdownOptions: DropdownOption[] = [];

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
        this.resetGameSelection();
        this.fetchGamesByPlatformIdAndPopulateDropdown();
      });
  }

  // Note: Angular will throw a TypeError in the template if these aren't cast as a FormControl
  getPlatformFormControl(): FormControl { return this.gameSelectionFormGroup.get(GameSelectionControlName.Platform) as FormControl };
  getGameFormControl(): FormControl { return this.gameSelectionFormGroup.get(GameSelectionControlName.Game) as FormControl };

  // API Actions + Side Effects
  fetchPlatformsAndPopulateDropdown() {
    let request: GETPlatformsRequest = {
      apikey: TheGamesDBAPIKey
    };

    this.theGamesDbAPIService.getAllPlatforms(request)
      .subscribe((response: GETPlatformsResponse) => {
        if (response?.data?.count) {
          this.platformDropdownOptions = TheGamesDBAPIFormMapper.MapPlatformsDictionaryToPlatformDropdownOptions(response.data.platforms);
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
            this.enableGameSelection();
            this.gamesDropdownOptions = TheGamesDBAPIFormMapper.MapGamesDictionaryToGameDrodpownOptions(response.data.games);
          } else {
            this.handleNoGamesAvailable();
          }
        });
    }
  }

  private resetGameSelection() {
    if (!this.gameSelectionFormGroup.get(GameSelectionControlName.Game).pristine) {
      this.gameSelectionFormGroup.get(GameSelectionControlName.Game).reset();
    }
  }

  private enableGameSelection() {
    this.gameSelectionFormGroup.get(GameSelectionControlName.Game).enable();
  }

  private handleNoGamesAvailable() {
    this.gameSelectionFormGroup.get(GameSelectionControlName.Game).disable();
  }
  // END API Actions + Side Effects
}
