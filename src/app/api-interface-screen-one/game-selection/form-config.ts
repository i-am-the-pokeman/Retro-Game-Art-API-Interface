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
        gameSelectionFormConfigData.forEach(formConfig => {
            formGroup.addControl(
                formConfig.ControlName,
                new FormControl(formConfig.DefaultValue, formConfig.Validators)
            );
        });

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
                Label: 'Platform',
                Validators: [Validators.required],
                ErrorMessages: {}
            },
            {
                ControlName: GameSelectionControlName.Game,
                DefaultValue: null,
                Label: 'Game',
                Validators: [Validators.required],
                ErrorMessages: {}
            }
        ]
    }
}