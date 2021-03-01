import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
export class EasyAutocompleteComponent implements OnInit, OnDestroy {

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

  errorMessage: string = '';

  private stop$ = new Subject<any>();

  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;
  
  ngOnInit() {
    // Note: we must initialize the error message here, because touching + blurring an input for the first time does not fire statusChanges
    this.errorMessage = this.buildErrorMessage();
    this.autocompleteFormControl.statusChanges
      .pipe(takeUntil(this.stop$))
      .subscribe(() => {
        this.errorMessage = this.buildErrorMessage();
      });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  resetFormControl() {
    this.autocompleteFormControl.setValue(this.formInputData.DefaultValue);
  }

  private buildErrorMessage(): string {
    if (this.autocompleteFormControl.errors) {
      let message =  Object.keys(this.autocompleteFormControl?.errors)
                      .map((key: string) => this.formInputData.ErrorMessages[key])
                      .filter((errorText: string) => errorText?.length)
                      .join('. ');
      if (message?.length) message += '.';
      return message;
    } else {
      return '';
    }
  }

}
