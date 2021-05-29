import { ipcMain } from "electron";
import { WindowServiceInterface } from "../services/WindowServices/WindowService";
import { ImageDownloadServices } from "../services/ImageDownloadServices/ImageDownloadServices";

const WindowService: WindowServiceInterface = require("../services/WindowServices/WindowService");

class ImageDownloadMessageHandlers {
  constructor() {
    ipcMain.on('download-image', async (event, url, filename) => {
      // Handle Message
      await ImageDownloadServices.downloadImage(url, filename);

      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('download-image', null);
    });
  
    ipcMain.on('download-images', async (event, filesToDownload) => {
      // Handle Message
      await ImageDownloadServices.downloadImages(filesToDownload);
      
      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('download-image', null);
    });
  }
}

module.exports = new ImageDownloadMessageHandlers();
