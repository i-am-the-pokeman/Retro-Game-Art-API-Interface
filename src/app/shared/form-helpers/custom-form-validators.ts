import { FormControl, FormGroup } from "@angular/forms";

export class CustomFormValidators {
  /**  
   * Validates that a formGroup has at least one value populated
  */
  public static atLeastOneRequired(formGroup: FormGroup): {[key: string]: any} | null {
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

  /**
   * Validates if an autocomplete formControl that holds options of type DropdownOption has a selection
  */
  public static autocompleteRequired(formControl: FormControl): {[key: string]: any} | null {
    if (formControl) {
      if (!formControl.value?.Value) {
        return { required: true }
      }
    }
    return null;
  }
}
