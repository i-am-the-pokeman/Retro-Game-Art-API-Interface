import { Component, Input } from '@angular/core';
import { TooltipPosition } from '@angular/material/tooltip';

@Component({
  selector: 'disabled-element-tooltip',
  templateUrl: './disabled-element-tooltip.component.html',
  styleUrls: ['./disabled-element-tooltip.component.sass']
})
export class DisabledElementTooltipComponent {
  
  @Input() text: string = '';
  @Input() isChildDisabled: boolean = false;
  @Input() tooltipPosition: TooltipPosition = 'above';
}
