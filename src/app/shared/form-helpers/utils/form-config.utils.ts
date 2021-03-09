import { FormControl, FormGroup } from "@angular/forms";
import { InputConfig } from "../entities/input-config";

export class FormConfigUtils {
  public static getNewFormGroup(formConfigData: InputConfig[], formGroupValidatorFn?: any): FormGroup {
    let formGroup = new FormGroup({});

    if (formGroupValidatorFn) {
      formGroup.setValidators(formGroupValidatorFn);
    }
    
    // Initialize form controls
    formConfigData.forEach(formConfig => {
        formGroup.addControl(
            formConfig.ControlName,
            new FormControl(formConfig.DefaultValue, formConfig.Validators)
        );
    });
    // Disable any form controls that should start disabled
    formConfigData.forEach(formConfig => {
      if (formConfig.DisabledByDefault) {
        formGroup.get(formConfig.ControlName).disable();
      }
    });

    return formGroup;
  }

  public static getFormConfigDataMap(formConfigData: InputConfig[]): Map<string, InputConfig> {
      let formConfigDataMap = new Map();
      formConfigData.forEach((data) => {
          formConfigDataMap.set(data.ControlName, data);
      });
      return formConfigDataMap;
  }
}