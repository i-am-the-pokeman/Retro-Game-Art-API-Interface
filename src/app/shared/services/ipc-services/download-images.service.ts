import { Injectable } from "@angular/core";
import { DownloadImagesRequest } from "electron/messages/DownloadImageRequests";
import { FileToDownload } from "./download-images-entities";
const ipc = window.require('electron').ipcRenderer;

@Injectable()
export class DownloadImagesService {
  DownloadImages(request: DownloadImagesRequest) {
    if (request?.FilesToDownload?.length) {
      ipc.send('download-images', request)

      // TODO: Get status of download (success/failure)
      ipc.on('download-image', (event: any, arg: any) => {
        console.log('Message received from main thread.')
      });
    }
  }
}