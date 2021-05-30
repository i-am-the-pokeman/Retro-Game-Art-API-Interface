import { Injectable } from "@angular/core";
import { DownloadImageRequest, DownloadImagesRequest } from "./download-images-entities";
const ipc = window.require('electron').ipcRenderer;

@Injectable()
export class DownloadImagesService {
  DownloadImage(request: DownloadImageRequest) {
    if (request?.FileToDownload) {
      ipc.send('download-image', request)

      // TODO: Get status of download (success/failure)
      ipc.on('download-image', (event: any, arg: any) => {
        console.log('Message received from main thread.')
      });
    }
  }

  DownloadImages(request: DownloadImagesRequest) {
    if (request?.FilesToDownload?.length) {
      ipc.send('download-images', request)

      // TODO: Get status of download (success/failure)
      ipc.on('download-images', (event: any, arg: any) => {
        console.log('Message received from main thread.')
      });
    }
  }
}