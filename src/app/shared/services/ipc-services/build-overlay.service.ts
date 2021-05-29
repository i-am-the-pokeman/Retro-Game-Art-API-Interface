import { Injectable } from "@angular/core";
const ipc = window.require('electron').ipcRenderer;

@Injectable()
export class BuildOverlayService {
  BuildOverlay() {
    ipc.send('build-overlay');
  }
}