import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TheGamesDBAPIService } from 'src/app/APIs/TheGamesDB/TheGamesDBAPI.service';
import { GETGamesByPlatformIdRequest, GETGamesByPlatformIdResponse, GETPlatformsRequest, GETPlatformsResponse } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { TheGamesDBAPIKey } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIKey';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/form-helpers/angular-material-autocomplete-utils';
import { DropdownOption } from 'src/app/shared/form-helpers/entities';
import { FormConfigUtils } from 'src/app/shared/form-helpers/form-config.utils';
import { TheGamesDBAPIFormMapper } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from '../services/form-data/game-selection-form-data';
import { MatDialog } from '@angular/material/dialog';
import { AlertDialogComponent } from 'src/app/shared/components/alert-dialog/alert-dialog.component';

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
    private dialog: MatDialog,
    private theGamesDbAPIService: TheGamesDBAPIService
  ) { }

  ngOnInit() {
    // Fetch initial set of domain data
    this.fetchPlatformsAndPopulateDropdown();

    // Form events
    this.gameSelectionFormGroup.get(GameSelectionControlName.Platform)
      .valueChanges
      .subscribe(() => {
        this.resetGameSelection();
        this.fetchGamesByPlatformIdAndPopulateDropdown();
      });
  }

  /**
   * Notes:
   * - To be used exclusively in the template
   * - Angular will throw a TypeError in the template if these aren't cast as a FormControl
  */
  getPlatformFormControl(): FormControl { return this.gameSelectionFormGroup.get(GameSelectionControlName.Platform) as FormControl; }
  /**
   * Notes:
   * - To be used exclusively in the template
   * - Angular will throw a TypeError in the template if these aren't cast as a FormControl
  */
  getGameFormControl(): FormControl { return this.gameSelectionFormGroup.get(GameSelectionControlName.Game) as FormControl; }

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
      }, (error) => {
        this.openAlertDialog(error);
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
          (response?.data?.count)
            ? this.handleNewGameData(response)
            : this.handleNoGamesAvailable();
        }, (error) => {
          this.openAlertDialog(error);
        });
    } else {
      this.disableGameSelection();
    }
  }

  private openAlertDialog(message: string) {
    this.dialog.open(AlertDialogComponent, {
      data: {message: message}
    });
  }

  private handleNewGameData(response: GETGamesByPlatformIdResponse) {
    this.enableGameSelection();
    this.gamesDropdownOptions = TheGamesDBAPIFormMapper.MapGamesDictionaryToGameDrodpownOptions(response.data.games);
  }
  private handleNoGamesAvailable() {
    this.disableGameSelection();
    this.openAlertDialog('No Games Found')
  }

  private resetGameSelection() {
    if (!this.gameSelectionFormGroup.get(GameSelectionControlName.Game).pristine) { // Only reset if the controls have been touched
      this.gameSelectionFormGroup.get(GameSelectionControlName.Game).reset();
    }
  }
  private enableGameSelection() {
    if (this.gameSelectionFormGroup.get(GameSelectionControlName.Game).disabled) { // Avoid firing statusChanges unnecessarily
      this.gameSelectionFormGroup.get(GameSelectionControlName.Game).enable();
    }
  }
  private disableGameSelection() {
    if (this.gameSelectionFormGroup.get(GameSelectionControlName.Game).enabled) { // Avoid firing statusChanges unnecessarily
      this.gameSelectionFormGroup.get(GameSelectionControlName.Game).disable();
    }
  }
  // END API Actions + Side Effects
}
