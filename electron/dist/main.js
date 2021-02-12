"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
const url = require("url");
let win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    win.loadURL(url.format({
        pathname: path.join(__dirname, `/../../dist/retro-game-art-api-interface/index.html`),
        protocol: "file:",
        slashes: true
    }));
    // uncomment to open dev tools on app start
    //win.webContents.openDevTools();
}
electron_1.app.whenReady().then(createWindow);
electron_1.app.on("activate", () => {
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// Quit when all windows are closed.
electron_1.app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map