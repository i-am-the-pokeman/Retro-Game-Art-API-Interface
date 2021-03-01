import { Component, Input, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AngularMaterialAutocompleteUtils } from '../../form-helpers/angular-material-autocomplete-utils';
import { DropdownOption, FormInputData } from '../../form-helpers/entities';

@Component({
  selector: 'easy-autocomplete',
  templateUrl: './easy-autocomplete.component.html',
  styleUrls: ['./easy-autocomplete.component.sass']
})
export class EasyAutocompleteComponent implements OnDestroy {

  @Input() autocompleteFormControl: FormControl;
  @Input() formInputData: FormInputData;
  @Input()
  get dropdownOptions(): DropdownOption[] {
    return this._dropdownOptions;
  };
  set dropdownOptions(options: DropdownOption[]) {
    this._dropdownOptions = options;

    this.filteredDropdownOptions
      = AngularMaterialAutocompleteUtils.GetFilteredAutoCompleteOptions$(this.autocompleteFormControl, this.dropdownOptions)
        .pipe(takeUntil(this.stop$));
  }
  private _dropdownOptions: DropdownOption[] = [];
  filteredDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

  private stop$ = new Subject<any>();

  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;
  
  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

}
