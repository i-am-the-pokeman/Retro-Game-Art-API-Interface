import { FormGroup } from "@angular/forms";

export class CustomFormValidators {
  /**  
   * Validates that a formGroup has at least one value populated
  */
  static atLeastOneRequired(formGroup: FormGroup): {[key: string]: any} | null {
    let controls = formGroup.controls;
    if (controls) {
      let populatedControl = Object.keys(controls).find(key => {
        return !!controls[key].value
      });
      if (!populatedControl) {
        return {
          atLeastOneRequired: true
        }
      }
    }
    return null;
  }
}
