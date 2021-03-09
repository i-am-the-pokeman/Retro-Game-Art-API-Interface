import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AngularMaterialAutocompleteUtils } from '../../form-helpers/utils/angular-material-autocomplete-utils';
import { InputConfig } from '../../form-helpers/entities/input-config';
import { DropdownOption } from '../../form-helpers/entities/dropdown-option';

@Component({
  selector: 'easy-autocomplete',
  templateUrl: './easy-autocomplete.component.html',
  styleUrls: ['./easy-autocomplete.component.sass']
})
export class EasyAutocompleteComponent implements OnInit, OnDestroy {

  @Input() autocompleteFormControl: FormControl;
  @Input() formInputData: InputConfig;
  @Input()
    get dropdownOptions(): DropdownOption[] {
      return this._dropdownOptions;
    }
    set dropdownOptions(options: DropdownOption[]) {
      this._dropdownOptions = options;

      this.filteredDropdownOptions
        = AngularMaterialAutocompleteUtils
          .GetFilteredAutoCompleteOptions$(this.autocompleteFormControl, this.dropdownOptions)
          .pipe(takeUntil(this.stop$));
    }
  private _dropdownOptions: DropdownOption[] = [];
  filteredDropdownOptions: Observable<DropdownOption[]> = new Observable<DropdownOption[]>();

  errorMessage: string = '';

  private stop$ = new Subject<any>();

  readonly AngularMaterialAutocompleteUtils = AngularMaterialAutocompleteUtils;

  // TODO: this code is repeated every 'easy' formcontrol so far. Is it time to make an abstract class?
  ngOnInit() {
    // Note: we must initialize the error message here, because touching + blurring an input for the first time does not fire statusChanges
    this.errorMessage = this.buildErrorMessage();
    this.autocompleteFormControl.statusChanges
      .pipe(
        takeUntil(this.stop$),
        debounceTime(500)
      ).subscribe(() => {
        this.errorMessage = this.buildErrorMessage();
      });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  resetFormControl() {
    this.autocompleteFormControl.reset();
  }

  // TODO: this code is repeated every 'easy' formcontrol so far. Is it time to make an abstract class?
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
