import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DropdownOption } from "./entities";

export class AngularMaterialAutocompleteUtils {
    // TODO: make function name start with capitol letter
    /** Used to display the dropdownOption's Text property in the autocomplete input via the [displayWith] input */
    public static getDropdownOptionText(dropdownOption: DropdownOption): string {
        return dropdownOption?.Text;
    }

    public static GetFilteredAutoCompleteOptions$(formControl: AbstractControl,
                                                    dropdownOptions: DropdownOption[])
                                                    : Observable<DropdownOption[]> {
        return formControl.valueChanges                                         
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value?.Text),
                    map(text => text ? this.filter(text, dropdownOptions) : dropdownOptions.slice())
                )
    }
    private static filter(text: string, dropdownOptions: DropdownOption[]): DropdownOption[] {
        const filterValue = text.toLowerCase();
        return dropdownOptions.filter(option => option.Text.toLowerCase().indexOf(filterValue) >= 0);
    }
}