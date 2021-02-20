import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ImageSelectionUrls } from './entities';

@Component({
  selector: 'image-selection',
  templateUrl: './image-selection.component.html',
  styleUrls: ['./image-selection.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ImageSelectionComponent implements OnInit {

  // TODO: on changes, make API call for image urls
  @Input() gameSelectionId: number;
  @Output() imagesSelected = new EventEmitter<ImageSelectionUrls>();

  // TODO: set up form group

  constructor() { }

  ngOnInit(): void {
    // TODO: set up subscription to group value changes, build url based on what was changed, emit result to parent on selection
  }

}
