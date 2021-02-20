import { Component, Input } from '@angular/core';

@Component({
  selector: 'next-back-stepper-buttons',
  templateUrl: './next-back-stepper-buttons.component.html'
})
export class NextBackStepperButtonsComponent{

  @Input() showBack: boolean = false;
  @Input() showNext: boolean = false;

}
