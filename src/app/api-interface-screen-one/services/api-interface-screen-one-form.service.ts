import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CustomFormValidators } from "src/app/shared/form-helpers/utils/custom-form-validators";
import { FormConfigUtils } from "src/app/shared/form-helpers/utils/form-config.utils";
import { GameSelectionFormConfig } from "./form-data/game-selection-form-data";
import { GameImageTypeSelectionFormConfig } from "./form-data/image-selection-form-data";

export enum ApiInterfaceGroupName {
  GameSelection = 'gameselection',
  ImageTypeSelection = 'imagetypeselection'
}

@Injectable()
export class ApiInterfaceScreenOneFormService {
  public static getNewFormGroup(): FormGroup {
    let formGroup = new FormGroup({});
    formGroup.addControl(
      ApiInterfaceGroupName.GameSelection,
      FormConfigUtils.getNewFormGroup(GameSelectionFormConfig.getFormConfigData())
    );
    formGroup.addControl(
      ApiInterfaceGroupName.ImageTypeSelection,
      FormConfigUtils.getNewFormGroup(GameImageTypeSelectionFormConfig.getFormConfigData(), CustomFormValidators.atLeastOneRequired)
    );
    return formGroup;
  }
}
