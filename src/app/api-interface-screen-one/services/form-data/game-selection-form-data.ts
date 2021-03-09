import { ValidatorFn } from "@angular/forms";
import { CustomFormValidators } from "src/app/shared/form-helpers/utils/custom-form-validators";
import { InputConfig } from "src/app/shared/form-helpers/entities/input-config";

export enum GameSelectionControlName {
    Platform = 'platform',
    Game = 'game'
}

export class GameSelectionFormConfig {

    public static getFormConfigData(): InputConfig[] {
        return [
            {
                ControlName: GameSelectionControlName.Platform,
                DefaultValue: null,
                Label: 'Platform',
                Validators: [CustomFormValidators.autocompleteRequired as ValidatorFn],
                ErrorMessages: { required: 'Please select a Platform' },
                PlaceholderText: 'Start typing...'
            },
            {
                ControlName: GameSelectionControlName.Game,
                DefaultValue: null,
                Label: 'Game',
                Validators: [CustomFormValidators.autocompleteRequired as ValidatorFn],
                ErrorMessages: { required: 'Please select a Game' },
                DisabledByDefault: true,
                PlaceholderText: 'Start typing...'
            }
        ]
    }
}