import { WindowServiceInterface } from "../WindowServices/WindowService";

const { download } = require('electron-dl');
const WindowService: WindowServiceInterface = require('../WindowServices/WindowService');

export class ImageDownloadServices {
  public static async downloadImage(url: string, filename: string) {
    let options = {
      openFolderWhenDone: true,
      filename: filename
    }
    await download(WindowService.BrowserWindow, url, options)
                  .then((dl: any) => console.log(dl.getSavePath()))
                  .catch(console.error);
  }

  public static async downloadImages(filesToDownload: any) {
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