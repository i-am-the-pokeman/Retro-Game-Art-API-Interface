import { ipcMain } from "electron";
import { WindowServiceInterface } from "../services/WindowServices/WindowService";
import { OverlayBuilderService } from "../services/OverlayBuilderServices/OverlayBuilderService";
import { CreateOverlayRequest } from "messages/CreateOverlayRequest";

const WindowService: WindowServiceInterface = require("../services/WindowServices/WindowService");

class OverlayBuilderMessageHandlers {
  constructor() {
    ipcMain.on('build-overlay', async (event, request: CreateOverlayRequest) => {
      // Handle Message
      await OverlayBuilderService.BuildOverlay(request) 

      // Inform UI when finished
      WindowService.BrowserWindow.webContents.send('build-overlay', null);
    });
  }
}

module.exports = new OverlayBuilderMessageHandlers();