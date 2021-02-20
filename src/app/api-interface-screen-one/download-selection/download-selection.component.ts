import { Component, Input, OnInit } from '@angular/core';
import { ImageSelectionUrls } from '../image-selection/entities';

@Component({
  selector: 'download-selection',
  templateUrl: './download-selection.component.html',
  styleUrls: ['./download-selection.component.less']
})
export class DownloadSelectionComponent implements OnInit {

  @Input() imageSelectionUrls: ImageSelectionUrls;

  constructor() { }

  // TODO: add download button
  // TODO: on download button press, (send event to parent?) download images to harddrive
  ngOnInit(): void {
  }

}
