import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.sass']
})
export class SummaryComponent implements OnInit {
  @Output() downloadButtonClick = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  onDownloadButtonClick() {
    this.downloadButtonClick.emit();
  }
}
