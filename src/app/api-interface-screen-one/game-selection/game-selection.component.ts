import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Game, Platform, PlatformsDictionary } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIEntities';
import { AngularMaterialAutocompleteUtils } from 'src/app/shared/form-helpers/utils/angular-material-autocomplete-utils';
import { DropdownOption } from 'src/app/shared/form-helpers/entities/dropdown-option';
import { FormConfigUtils } from 'src/app/shared/form-helpers/utils/form-config.utils';
import { TheGamesDBAPIFormMapper } from 'src/app/APIs/TheGamesDB/TheGamesDBAPIFormMapper';
import { GameSelectionControlName, GameSelectionFormConfig } from '../services/form-data/game-selection-form-data';

@Component({
  selector: 'game-selection',
  templateUrl: './game-selection.component.html',
  styleUrls: ['./game-selection.component.sass']
})
export class GameSelectionComponent {
  @Input() gameSelectionFormGroup: FormGroup;
  readonly formConfigDataMap = FormConfigUtils.getFormConfigDataMap(GameSelectionFormConfig.getFormConfigData());

  @Input()
  set platforms(platforms: Platform[]) {
    this.platformDropdownOptions
      = TheGamesDBAPIFormMapper.MapPlatformsToDropdownOptions(platforms);
  };
  @Input()
  set games(games: Game[]) {
    this.gamesDropdownOptions
      = TheGamesDBAPIFormMapper.MapGamesToDropdownOptions(games);
  };

  platformDropdownOptions: DropdownOption[] = [];
  gamesDropdownOptions: DropdownOption[] = [];

  // Reveal to template
  readonly GameSelectionControlName = GameSelectionControlName;
  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;

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
  // END API Actions + Side Effects
}
