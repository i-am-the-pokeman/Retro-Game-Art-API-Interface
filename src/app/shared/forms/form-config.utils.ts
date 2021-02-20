import { FormControl, FormGroup } from "@angular/forms";
import { FormInputData } from "./entities";

export class FormConfigUtils {
  public static getFormGroup(formConfigData: FormInputData[]): FormGroup {
    let formGroup = new FormGroup({});
    
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
        formGroup.controls[formConfig.ControlName].disable();
      }
    })

    return formGroup;
  }

  public static getFormConfigDataMap(formConfigData: FormInputData[]): Map<string, FormInputData> {
      let formConfigDataMap = new Map();
      formConfigData.forEach((data) => {
          formConfigDataMap.set(data.ControlName, data);
      });
      return formConfigDataMap;
  }
}