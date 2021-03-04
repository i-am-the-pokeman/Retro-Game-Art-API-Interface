import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DropdownOption, FormInputData } from '../../form-helpers/entities';

@Component({
  selector: 'easy-dropdown',
  templateUrl: './easy-dropdown.component.html',
  styleUrls: ['./easy-dropdown.component.sass']
})
export class EasyDropdownComponent implements OnInit {

  @Input() dropdownFormControl: FormControl;
  @Input() formInputData: FormInputData;
  @Input() dropdownOptions: DropdownOption[];

  errorMessage: string = '';

  private stop$ = new Subject<any>();

  // TODO: this code is repeated every 'easy' formcontrol so far. Is it time to make an abstract class?
  ngOnInit() {
    // Note: we must initialize the error message here, because touching + blurring an input for the first time does not fire statusChanges
    this.errorMessage = this.buildErrorMessage();
    this.dropdownFormControl.statusChanges
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

  // TODO: this code is repeated every 'easy' formcontrol so far. Is it time to make an abstract class?
  private buildErrorMessage(): string {
    if (this.dropdownFormControl.errors) {
      let message =  Object.keys(this.dropdownFormControl?.errors)
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
