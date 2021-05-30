import { DownloadImageRequest, DownloadImagesRequest } from "messages/DownloadImageRequests";
import { WindowServiceInterface } from "../WindowServices/WindowService";

const { download } = require('electron-dl');
const WindowService: WindowServiceInterface = require('../WindowServices/WindowService');

export class ImageDownloadServices {
  public static async downloadImage(request: DownloadImageRequest) {
    let fileToDownload = request?.FileToDownload;
 
    let options = {
      openFolderWhenDone: true,
      filename: fileToDownload.filename
    }
    await download(WindowService.BrowserWindow, fileToDownload.url, options)
                  .then((dl: any) => console.log(dl.getSavePath()))
                  .catch(console.error);
  }

  public static async downloadImages(request: DownloadImagesRequest) {
    let filesToDownload = request?.FilesToDownload ?? [];

    for (const file of filesToDownload) {
      let options = {
        saveAs: false,
        showBadge: false,
        filename: file.filename
      }
      await download(WindowService.BrowserWindow, file.url, options)
                    .then((dl: any) => console.log(dl.getSavePath()))
                    .catch(console.error);
    }
  }
}