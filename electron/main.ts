import { app, BrowserWindow, ipcMain } from "electron";

const Store = require('electron-store');
Store.initRenderer();

// Initialize App by Creating WindowService Singleton
const WindowService = require('./services/WindowServices/WindowService');

// Initialize Listeners with MessageHandler Singletons
const ImageDownloadMessageHandlers = require('./message-handlers/ImageDownloadMessageHandlers');
const OverlayBuilderMessageHandlers = require('./message-handlers/OverlayBuilderMessageHandlers');
