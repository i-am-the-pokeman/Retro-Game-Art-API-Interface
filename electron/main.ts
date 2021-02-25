import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as url from "url";
import * as fs from "fs";

const { download } = require('electron-dl');

const Store = require('electron-store');
Store.initRenderer();

let win: BrowserWindow;

function createWindow() {
  win = new BrowserWindow(
    {
      webPreferences: {
        nodeIntegration: true,
      },
      width: 1020,
      height: 720
    });

  win.loadURL(
    url.format({ // TODO: Use function that isn't deprecated
      pathname: path.join(__dirname, `/../../dist/retro-game-art-api-interface/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  win.setMenuBarVisibility(false);

  // uncomment this if you'd like the app to start with dev tools open 
  win.webContents.openDevTools();
}

// APP EVENTS
app.whenReady().then(createWindow);

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
});
// END APP EVENTS

// IPC EVENTS
ipcMain.on('download-image', async (event, arg) => {
  console.log('Message from UI:');
  console.log(arg);

  let options = {
    openFolderWhenDone: true
  }
  await download(win, arg, options);

  // TODO: send status of download back to UI
  win.webContents.send('download-image', null);
});
// END IPC EVENTS
