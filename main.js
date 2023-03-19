// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, session } = require('electron')
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs')

require('dotenv').config();

// Import Components
const dataBaseComponent = require('./src/database/database.controller')

// Import DataBase /API Schema
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
        minWidth: 1225,
        minHeight: 725,
        resizable: true,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, "./src/components/script/preload/preload.js")
        }
    })
  
    windows.loadFile('./src/components/pages/login.html')
}

// =========== App Ready ===========
app.on('ready', async () => {
    const uri = process.env.MONGODB_HOST;

    // Mongodb Connection
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB : Ready !'));
});


app.whenReady().then(() => {
    createWindow()
})

// =========== All IPC Call ===========
// ====> DataBase :
ipcMain.on('db/add-user', (event, data) => {
    dataBaseComponent.addUserController(data)

    windows.loadFile('./src/components/pages/login.html')
});

// ====> Redirect Page :
ipcMain.on('redirect/forgot-password', (event, data) => {
    windows.loadFile('./src/components/pages/register.html')
});

ipcMain.on('redirect/have-account', (event, data) => {
    windows.loadFile('./src/components/pages/login.html')
});

// ====> Application :
ipcMain.on("app/login-user", async (event, data) => {
    const win = BrowserWindow.getAllWindows()[0];

    let userFound = await dataBaseComponent.loginUserController(data)

    if (!userFound) {
        win.webContents.send('app/login-error')
    } else {
        // win.webContents.send('app/set-cookie', (data))
        const cookie = { url: 'http://localhost/', name: 'dummy_name', value: 'dummy' }


        const store = new Store();

        session.defaultSession.cookies.get({})
            .then((cookies) => {
                console.log("OKKKKK");
                store.set('cookies', cookies);
            })
            .catch((error) => {
                console.error(error);
            });

        const cookies = store.get('cookies');

        if (cookies) {
            cookies.forEach((cookie) => {
                session.defaultSession.cookies.set(cookie);
                console.log(cookie);
            });
        }

        // windows.loadFile('./src/components/pages/dashboard.html')
    }
});

ipcMain.on("app/minimize", () => {
    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});
