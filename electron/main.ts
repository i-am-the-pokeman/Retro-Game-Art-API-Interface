import { app, BrowserWindow, ipcMain } from "electron";

const Store = require('electron-store');
Store.initRenderer();

const WindowService = require('./services/WindowServices/WindowService');
const ImageDownloadMessagehandlers = require('./message-handlers/ImageDownloadMessageHandlers');

// APP EVENTS

// END APP EVENTS

// IPC EVENTS

//#region build-overlay
ipcMain.on('build-overlay', async (event) => {
  console.log('build-overlay message received');
});
//#endregion
// END IPC EVENTS
