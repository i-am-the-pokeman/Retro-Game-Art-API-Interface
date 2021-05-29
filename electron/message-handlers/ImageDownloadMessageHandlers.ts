import { ipcMain } from "electron";
import { ImageDownloadServices } from "../services/ImageDownloadServices/ImageDownloadServices";


class ImageDownloadMessagehandlers {
  constructor() {
    ipcMain.on('download-image', async (event, url, filename) => {
      ImageDownloadServices.downloadImage(url, filename);
    });
  
    ipcMain.on('download-images', async (event, filesToDownload) => {
      ImageDownloadServices.downloadImages(filesToDownload);
    });
  }
}

module.exports = new ImageDownloadMessagehandlers();
