import { ValidatorFn, Validators } from "@angular/forms";
import { CustomFormValidators } from "src/app/shared/form-helpers/custom-form-validators";
import { FormInputData } from "src/app/shared/form-helpers/entities";

export enum GameSelectionControlName {
    Platform = 'platform',
    Game = 'game'
}

export class GameSelectionFormConfig {

    public static getFormConfigData(): FormInputData[] {
        return [
            {
                ControlName: GameSelectionControlName.Platform,
                DefaultValue: null,
                Label: 'Find Platform',
                Validators: [CustomFormValidators.autocompleteRequired as ValidatorFn],
                ErrorMessages: { required: 'Please select a Platform.' },
                PlaceholderText: 'Start typing...'
            },
            {
                ControlName: GameSelectionControlName.Game,
                DefaultValue: null,
                Label: 'Find Game',
                Validators: [CustomFormValidators.autocompleteRequired as ValidatorFn],
                ErrorMessages: { required: 'Please select a Platform.' },
                DisabledByDefault: true,
                PlaceholderText: 'Start typing...'
            }
        ]
    }
}