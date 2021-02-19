import { ValidatorFn } from "@angular/forms";

export interface DropdownValue {
    Text: string;
    Value: any;
}

export interface FormInputData {
    ControlName: string;
    DefaultValue: any;
    DependantOnControlsConfig?: DependantOnControlsConfig;
    Label: string;
    HintText?: string;
    Validators?: ValidatorFn[]
    ErrorMessages: any
}

/**
 * - A dependant control is disabled until the control it's dependant on is valid
 * - A dependant control is reset whenever a control it's dependant on changes value
*/
export interface DependantOnControlsConfig {
    // TODO: there's only one value here for now, but this can be expanded in the future
    DependantOnControls: string[];
}
