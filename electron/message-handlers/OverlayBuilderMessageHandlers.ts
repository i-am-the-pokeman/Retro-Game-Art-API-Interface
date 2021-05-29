import { ipcMain } from "electron";
import { WindowServiceInterface } from "../services/WindowServices/WindowService";
import { OverlayBuilderService } from "../services/OverlayBuilderServices/OverlayBuilderService";

const WindowService: WindowServiceInterface = require("../services/WindowServices/WindowService");

class OverlayBuilderMessageHandlers {
  constructor() {
    ipcMain.on('build-overlay', async (event) => {
      // Handle Message
      OverlayBuilderService.BuildOverlay() 

      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('build-overlay', null);
    });
  }
}

module.exports = new OverlayBuilderMessageHandlers();