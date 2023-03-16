// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

let windows

const createWindow = () => {
    windows = new BrowserWindow({
        frame: false,
        autoHideMenuBar: true,
        width: 1225,
        height: 725,
        resizable: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "./src/js/preload.js") // use a preload script
          }
    })
  
    windows.loadFile('src/pages/index.html')
}

app.on('ready', async () => {
    const uri = process.env.MONGODB_HOST;

    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB : Ready !'));
});

app.whenReady().then(() => {
    createWindow()
})

ipcMain.on("app/minimize", () => {
    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});
