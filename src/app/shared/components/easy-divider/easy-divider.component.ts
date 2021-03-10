import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-divider',
  templateUrl: './easy-divider.component.html',
  styleUrls: ['./easy-divider.component.sass']
})
export class EasyDividerComponent implements OnInit {
  @Input() scenario: 'standard' | 'card-header' = 'standard'

  inset: boolean = true;
  paddingClass: string = 'padding-lg-vertical';

  ngOnInit() {
    switch(this.scenario) {
      case 'standard':
        this.inset = true;
        this.paddingClass = 'padding-lg-vertical';
        break;
      case 'card-header':
        this.inset = false;
        this.paddingClass = 'padding-lg-bottom';
        break;
    }
  }
}
