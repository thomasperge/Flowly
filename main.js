// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, session } = require('electron')
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
const fs = require('fs');

require('dotenv').config();

// Import Components
const dataBaseComponent = require('./src/database/database.controller')
const apiComponent = require('./src/api/api.controller')

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
        width: 1400,
        height: 775,
        minWidth: 1400,
        minHeight: 775,
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


// ====> API :
ipcMain.on('api/add-car-record', async (event, data) => {
    console.log(data.brands, data.models, data.years, data.km, data.date);
    console.log("Id : ", await apiComponent.getVehicleBrandIdController(data));
})

// ====> Redirect Page :
ipcMain.on('redirect/forgot-password', (event, data) => {
    windows.loadFile('./src/components/pages/register.html')
});

ipcMain.on('redirect/have-account', (event, data) => {
    windows.loadFile('./src/components/pages/login.html')
});




function saveConfig(config, configPath) {
    fs.writeFileSync(configPath, JSON.stringify(config));
}

function loadConfig() {
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    } catch (err) {
      return {};
    }
}

// ====> Application :
ipcMain.on("app/login-user", async (event, data) => {
    const win = BrowserWindow.getAllWindows()[0];

    let userFound = await dataBaseComponent.loginUserController(data)

    if (!userFound) {
        // User Not Found
        win.webContents.send('app/login-error')
    } else {
        // User Found
        // Get all data about users with email
        let userData = await dataBaseComponent.returnUserDataFromEmailController(data)

        const dataPath = path.join(app.getAppPath(), 'data.json');

        const config = loadConfig();
        config.id = userData._id;

        saveConfig(config, dataPath);

        windows.loadFile('./src/components/pages/dashboard.html')
    }
});

ipcMain.on("app/minimize", () => {
    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});
