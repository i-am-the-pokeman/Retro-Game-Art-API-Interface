import { DropdownValue } from "./entities";

export class AngularMaterialAutocompleteUtils {
    /** Used to display the dropdownValue's Text property in the autocomplete input via the [displayWith] input */
    public static getDropdownValueText(dropdownValue: DropdownValue): string {
        return dropdownValue?.Text;
    }
}