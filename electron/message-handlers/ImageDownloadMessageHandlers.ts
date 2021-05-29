import { ipcMain } from "electron";
import { ImageDownloadServices } from "../services/ImageDownloadServices/ImageDownloadServices";


class ImageDownloadMessageHandlers {
  constructor() {
    ipcMain.on('download-image', async (event, url, filename) => {
      await ImageDownloadServices.downloadImage(url, filename);
    });
  
    ipcMain.on('download-images', async (event, filesToDownload) => {
      await ImageDownloadServices.downloadImages(filesToDownload);
    });
  }
}

module.exports = new ImageDownloadMessageHandlers();
