import { ipcMain } from "electron";
import { WindowServiceInterface } from "../services/WindowServices/WindowService";
import { ImageDownloadServices } from "../services/ImageDownloadServices/ImageDownloadServices";
import { DownloadImageRequest, DownloadImagesRequest } from "../messages/DownloadImageRequests";

const WindowService: WindowServiceInterface = require("../services/WindowServices/WindowService");

class ImageDownloadMessageHandlers {
  constructor() {
    ipcMain.on('download-image', async (event, request: DownloadImageRequest) => {
      // Handle Message
      await ImageDownloadServices.downloadImage(request);

      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('download-image', null);
    });
  
    ipcMain.on('download-images', async (event, request: DownloadImagesRequest) => {
      // Handle Message
      await ImageDownloadServices.downloadImages(request);
      
      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('download-images', null);
    });
  }
}

module.exports = new ImageDownloadMessageHandlers();
