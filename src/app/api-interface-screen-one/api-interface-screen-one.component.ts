import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
const ipc = window.require('electron').ipcRenderer;

@Component({
  selector: 'api-interface-screen-one',
  templateUrl: './api-interface-screen-one.component.html',
  styleUrls: ['./api-interface-screen-one.component.less']
})
export class ApiInterfaceScreenOneComponent implements OnInit {

  isDownloadButtonDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  downloadImages() {
    // Tell main thread to download image
    this.isDownloadButtonDisabled = true;
    let testURL = 'https://hips.hearstapps.com/countryliving.cdnds.net/17/47/2048x1365/gallery-1511194376-cavachon-puppy-christmas.jpg';
    ipc.send('download-image', testURL);

    // Get status of download (success/failure)
    ipc.on('download-image', (event: any, arg: any) => {
      this.isDownloadButtonDisabled = false;
      this.cdr.detectChanges();
      console.log('Message received from main thread.')
    });
  }
}
