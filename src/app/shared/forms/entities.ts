import { ValidatorFn } from "@angular/forms";

export interface DropdownOption {
    Text: string;
    Value: any;
}

// TODO: make an object for ux items
export interface FormInputData {
    ControlName: string;
    DefaultValue: any;
    DependantOnControlsConfig?: DependantOnControlsConfig;
    Label: string;
    HintText?: string;
    Validators?: ValidatorFn[];
    ErrorMessages: any;
    DisabledByDefault?: boolean;
    PlaceholderText?: string;
}

/**
 * - A dependant control is disabled until the control it's dependant on is valid
 * - A dependant control is reset whenever a control it's dependant on changes value
*/
// TODO: should I swap from "dependant ON controls" to " dependant controls"?
export interface DependantOnControlsConfig {
    // TODO: there's only one value here for now, but this can be expanded in the future
    DependantOnControls: string[];
}
