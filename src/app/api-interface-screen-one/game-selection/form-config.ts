import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInputData } from "src/app/shared/forms/entities";
import { FormConfigUtils } from "src/app/shared/forms/form-config.utils";

export enum GameSelectionControlName {
    Platform = 'platform',
    Game = 'game'
}

export class GameSelectionFormConfig {
    public static getFormGroup(): FormGroup {
      return FormConfigUtils.getFormGroup(this.getFormConfigData());
    }

    public static getFormConfigDataMap(): Map<string, FormInputData> {
        return FormConfigUtils.getFormConfigDataMap(this.getFormConfigData());
    }

    public static getFormConfigData(): FormInputData[] {
        return [
            {
                ControlName: GameSelectionControlName.Platform,
                DefaultValue: null,
                Label: 'Find Platform',
                Validators: [Validators.required],
                ErrorMessages: { required: 'Please select a Platform.' },
                PlaceholderText: 'Start typing...'
            },
            {
                ControlName: GameSelectionControlName.Game,
                DefaultValue: null,
                Label: 'Find Game',
                Validators: [Validators.required],
                ErrorMessages: { required: 'Please select a Platform.' },
                DisabledByDefault: true,
                PlaceholderText: 'Start typing...'
            }
        ]
    }
}