import { FormGroup, Validators } from "@angular/forms";
import { FormInputData } from "src/app/shared/forms/entities";
import { FormConfigUtils } from "src/app/shared/forms/form-config.utils";

export enum GameImageTypeSelectionControlName {
  Icon = 'icon',
  Banner = 'banner'
}

export class GameImageTypeSelectionFormConfig {
    public static getFormGroup(): FormGroup {
      return FormConfigUtils.getFormGroup(this.getFormConfigData(), this.atLeastOneRequired);
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
    
    private static atLeastOneRequired(controlGroup: FormGroup): {[key: string]: any} | null {
      let controls = controlGroup.controls;
      if (controls) {
        let populatedControl = Object.keys(controls).find(key => {
          console.log(controls[key].value);
          return !!controls[key].value
        });
        if (!populatedControl) {
          return {
            atLeastOneRequired: {
              text: 'At least one selection is required.'
            }
          }
        }
      }
      return null;
    }
}