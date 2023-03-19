// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();
const dataBaseComponent = require('./src/database/database.controller')

// Import DataBase Schema
const { userSchema } = require('./models/account.js');
const { recordsSchema } = require('./models/account.js');
const { typeUsers } = require('./models/enum.js');

// Create Windows
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
            preload: path.join(__dirname, "./src/components/script/preload/preload.js")
        }
    })
  
    // windows.loadFile('./src/components/pages/register.html')
    windows.loadFile('./src/components/pages/login.html')
}

// ========== App Ready ==========
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

// ========== All IPC Call ==========
// ===> DataBase :
ipcMain.on('db/add-user', (event, data) => {
    dataBaseComponent.addUserController(data)

    windows.loadFile('./src/components/pages/login.html')
});

// ===> Redirect Page :
ipcMain.on('redirect/forgot-password', (event, data) => {
    windows.loadFile('./src/components/pages/register.html')
});

ipcMain.on('redirect/have-account', (event, data) => {
    windows.loadFile('./src/components/pages/login.html')
});

// ===> Application :
ipcMain.on("app/login-user", () => {
    dataBaseComponent.addUserController()
});

ipcMain.on("app/minimize", () => {
    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});