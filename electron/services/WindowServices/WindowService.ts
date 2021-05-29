import { app, BrowserWindow } from "electron/main";
import * as path from "path";
import * as url from "url";

export interface WindowServiceInterface {
  BrowserWindow: BrowserWindow;
}

class WindowService implements WindowServiceInterface {
  BrowserWindow: BrowserWindow = <BrowserWindow>{};

  constructor() {
    app.whenReady()
        .then(() => {
          this.BrowserWindow = this.createWindow();
        });

    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        this.BrowserWindow = this.createWindow();
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
  }


  private createWindow() {
    let win = new BrowserWindow(
      {
        webPreferences: {
          nodeIntegration: true,
          enableRemoteModule: true
        },
        width: 1020,
        height: 720
      });
  
      win.loadURL(
      url.format({ // TODO: Use function that isn't deprecated
        pathname: path.join(__dirname, `/../../../../dist/retro-game-art-api-interface/index.html`),
        protocol: "file:",
        slashes: true
      })
    );
    win.setMenuBarVisibility(false);
  
    // uncomment this if you'd like the app to start with dev tools open 
    win.webContents.openDevTools();

    return win;
  }
}

module.exports = new WindowService();