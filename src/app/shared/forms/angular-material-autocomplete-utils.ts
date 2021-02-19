import { AbstractControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { DropdownValue } from "./entities";

export class AngularMaterialAutocompleteUtils {
    // TODO: make function name start with capitol letter
    /** Used to display the dropdownValue's Text property in the autocomplete input via the [displayWith] input */
    public static getDropdownValueText(dropdownValue: DropdownValue): string {
        return dropdownValue?.Text;
    }

    public static GetFilteredAutoCompleteOptions$(formControl: AbstractControl,
                                                    dropdownValues: DropdownValue[])
                                                    : Observable<DropdownValue[]> {
        return formControl.valueChanges                                         
                .pipe(
                    startWith(''),
                    map(value => typeof value === 'string' ? value : value.Text),
                    map(text => text ? this.filter(text, dropdownValues) : dropdownValues.slice())
                )
    }
    private static filter(text: string, dropdownValues: DropdownValue[]): DropdownValue[] {
        const filterValue = text.toLowerCase();
        return dropdownValues.filter(option => option.Text.toLowerCase().indexOf(filterValue) >= 0);
    }
}