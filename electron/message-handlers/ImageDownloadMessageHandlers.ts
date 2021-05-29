import { ipcMain } from "electron";
import { WindowServiceInterface } from "../services/WindowServices/WindowService";
const { download } = require('electron-dl');
const WindowService: WindowServiceInterface = require('../services/WindowServices/WindowService');

class ImageDownloadMessagehandlers {

  constructor() {
    ipcMain.on('download-image', async (event, url, filename) => {
      this.downloadImage(url, filename);
    });
  
    ipcMain.on('download-images', async (event, filesToDownload) => {
      this.downloadImages(filesToDownload);
    });
  }

  private async downloadImage(url: string, filename: string) {
    let options = {
      openFolderWhenDone: true,
      filename: filename
    }
    await download(WindowService.BrowserWindow, url, options)
                  .then((dl: any) => console.log(dl.getSavePath()))
                  .catch(console.error);

    WindowService.BrowserWindow.webContents.send('download-image', null);
  }

  private async downloadImages(filesToDownload: any) {
    for (const file of filesToDownload) {
      await download(WindowService.BrowserWindow, file.url, {saveAs: false, showBadge: false, filename: file.filename})
    }

    WindowService.BrowserWindow.webContents.send('download-image', null);
  }
}

module.exports = new ImageDownloadMessagehandlers();
