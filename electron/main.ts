import { app, BrowserWindow, ipcMain } from "electron";

const Store = require('electron-store');
Store.initRenderer();

// Initialize App by Creating WindowService Singleton
const WindowService = require('./services/WindowServices/WindowService');

// Initialize Listeners with MessageHandler Singletons
const ImageDownloadMessagehandlers = require('./message-handlers/ImageDownloadMessageHandlers');

// TODO: clean up below with new message handler class

// IPC EVENTS

//#region build-overlay
ipcMain.on('build-overlay', async (event) => {
  console.log('build-overlay message received');
});
//#endregion
// END IPC EVENTS
