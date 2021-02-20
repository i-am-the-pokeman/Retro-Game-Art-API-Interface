import { FormControl, FormGroup, Validators } from "@angular/forms";
import { FormInputData } from "src/app/shared/forms/entities";

export enum GameSelectionControlName {
    Platform = 'platform',
    Game = 'game'
}

export class GameSelectionFormConfig {
    public static getFormGroup(): FormGroup {
        let formGroup = new FormGroup({});

        let gameSelectionFormConfigData = this.getFormConfigData();
        
        // Initialize form controls
        gameSelectionFormConfigData.forEach(formConfig => {
            formGroup.addControl(
                formConfig.ControlName,
                new FormControl(formConfig.DefaultValue, formConfig.Validators)
            );
        });
        // Disable any form controls that should start disabled
        gameSelectionFormConfigData.forEach(formConfig => {
          if (formConfig.DisabledByDefault) {
            formGroup.controls[formConfig.ControlName].disable();
          }
        })

        return formGroup;
    }

    public static getFormConfigDataMap(): Map<string, FormInputData> {
        let formConfigData = this.getFormConfigData();
        let formConfigDataMap = new Map();
        formConfigData.forEach((data) => {
            formConfigDataMap.set(data.ControlName, data);
        });
        return formConfigDataMap;
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