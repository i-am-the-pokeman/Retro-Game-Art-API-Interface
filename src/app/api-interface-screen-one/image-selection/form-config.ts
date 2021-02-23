import { FormGroup, Validators } from "@angular/forms";
import { CustomFormValidators } from "src/app/shared/forms/custom-form-validators";
import { FormInputData } from "src/app/shared/forms/entities";
import { FormConfigUtils } from "src/app/shared/forms/form-config.utils";

export enum GameImageTypeSelectionControlName {
  Icon = 'icon',
  Banner = 'banner'
}

export class GameImageTypeSelectionFormConfig {
    public static getFormGroup(): FormGroup {
      return FormConfigUtils.getFormGroup(this.getFormConfigData(), CustomFormValidators.atLeastOneRequired);
    }

    public static getFormConfigDataMap(): Map<string, FormInputData> {
      return FormConfigUtils.getFormConfigDataMap(this.getFormConfigData());
    }

    public static getFormConfigData(): FormInputData[] {
      return [
        {
            ControlName: GameImageTypeSelectionControlName.Icon,
            DefaultValue: null,
            Label: 'Select Icon Image Type',
            ErrorMessages: {},
            DisabledByDefault: true,
            PlaceholderText: 'Select image type...'
        },
        {
            ControlName: GameImageTypeSelectionControlName.Banner,
            DefaultValue: null,
            Label: 'Select Banner Image Type',
            ErrorMessages: {},
            DisabledByDefault: true,
            PlaceholderText: 'Select image type...'
        }
      ]
    }
}