import { Component, OnInit } from '@angular/core';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/forms/angular-material-autocomplete-utils';
import { DropdownValue } from 'src/app/shared/forms/entities';
import { TheGamesDBAPIFormMapper } from 'src/app/shared/forms/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from './form-config';

@Component({
  selector: 'game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.less']
})
export class GameSelectionComponent implements OnInit {

  // TODO: don't store the API key in this file lol
  readonly apikey: string = '';

  platformsDropdownValues: DropdownValue[] = [];

  formGroup = GameSelectionFormConfig.getFormGroup();
  readonly formConfigDataMap = GameSelectionFormConfig.getFormConfigDataMap();

  // Reveal to template
  readonly GameSelectionControlName = GameSelectionControlName;
  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;

  constructor(
    private theGamesDbAPIService: TheGamesDBAPIService
  ) { }

  ngOnInit() {
    this.fetchPlatformsAndPopulateDropdown();
  }

  fetchPlatformsAndPopulateDropdown() {
    let request: GETPlatformsRequest = {
      apikey: this.apikey
    };

    return this.theGamesDbAPIService.getAllPlatforms(request)
            .subscribe((response: GETPlatformsResponse) => {
              if (response?.data?.count) {
                this.platformsDropdownValues
                  = TheGamesDBAPIFormMapper.mapPlatformsToDropdownValues(
                                              Object.keys(response.data.platforms)
                                                      .map(key => response.data.platforms[key])
                                            );
              }
            });
  }

  fetchGamesByPlatformIdAndPopulateDropdown() {
    let platformId = this.formGroup.controls[GameSelectionControlName.Platform].value?.Value;
    if (!!platformId) {
      let request: GETGamesByPlatformIdRequest = {
        apikey: this.apikey,
        id: platformId
      }
      this.theGamesDbAPIService.getGamesByPlatformId(request)
        .subscribe((response: GETGamesByPlatformIdResponse) => {
          // TODO: add drodpown and convert res to dropdown data
          console.log(response);
        });
    }
  }
}
