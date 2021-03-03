import { Injectable } from "@angular/core";
import { FileToDownload } from "./download-images-entities";
const ipc = window.require('electron').ipcRenderer;

@Injectable()
export class DownloadImagesService {
  DownloadImages(filesToDownload: FileToDownload[]) {
    if (filesToDownload?.length) {
      ipc.send('download-images', filesToDownload)

      // TODO: Get status of download (success/failure)
      ipc.on('download-image', (event: any, arg: any) => {
        console.log('Message received from main thread.')
      });
    }
  }
}