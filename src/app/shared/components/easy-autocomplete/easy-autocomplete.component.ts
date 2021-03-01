import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private cdr: ChangeDetectorRef) {}
  
  ngOnInit() {
    this.errorMessage = this.buildErrorMessage();
    this.autocompleteFormControl.statusChanges
      .pipe(takeUntil(this.stop$))
      .subscribe((status) => {
        console.log(status);
        this.errorMessage = this.buildErrorMessage();
      });
  }

  ngOnDestroy() {
    this.stop$.next();
    this.stop$.complete();
  }

  buildErrorMessage(): string {
    if (this.autocompleteFormControl.errors) {
      return Object.keys(this.autocompleteFormControl?.errors)
              .map((key: string) => this.formInputData.ErrorMessages[key])
              .filter((errorText: string) => errorText?.length)
              .join('. ');
    } else {
      return '';
    }
  }

}
