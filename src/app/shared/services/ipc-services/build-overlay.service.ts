import { Injectable } from "@angular/core";
import { CreateOverlayRequest } from "./build-overlay-entities";
const ipc = window.require('electron').ipcRenderer;

@Injectable()
export class BuildOverlayService {
  BuildOverlay(request: CreateOverlayRequest) {
    if( request?.OverlayPieces?.length) {
      ipc.send('build-overlay', request);
    }
  }
}