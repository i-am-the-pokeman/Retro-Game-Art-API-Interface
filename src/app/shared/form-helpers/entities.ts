import { ValidatorFn } from "@angular/forms";

export interface DropdownOption {
    Text: string;
    Value: any;
}

export interface FormInputData {
    // Functionality
    ControlName: string;
    DefaultValue: any;
    DependantOnControlsConfig?: DependantOnControlsConfig;
    Validators?: ValidatorFn[];
    ErrorMessages: any;
    DisabledByDefault?: boolean;

    // UX
    Label: string;
    HintText?: string;
    PlaceholderText?: string;
}

/**
 * - A dependant control is disabled until the control it's dependant on is valid
 * - A dependant control is reset whenever a control it's dependant on changes value
*/
// TODO: should I swap from "dependant ON controls" to " dependant controls"?
export interface DependantOnControlsConfig {
    DependantOnControls: string[];
}
