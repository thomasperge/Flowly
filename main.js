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

// ========= App Ready =========
app.on('ready', async () => {
    const uri = process.env.MONGODB_HOST;

    // Mongodb Connection
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
    .then(() => console.log('MongoDB : Ready !'));
});

app.whenReady().then(async () => {
    createWindow()
})


// ========= All Ipc Call =========
// Database :
ipcMain.on('database/add-user', (event, data) => {
    dataBaseComponent.addUserController(data)
    windows.loadFile('./src/components/pages/login.html')
});

ipcMain.on('database/display-history', async () => {
    const win = BrowserWindow.getAllWindows()[0];
    let result = await dataBaseComponent.getAllRecordFromUserController()
    win.webContents.send('database/send-all-history', result.reverse())
})

// Api :
ipcMain.on('api/add-car', async (event, data) => {
    const win = BrowserWindow.getAllWindows()[0];
    
    let dataResponse = {
        input: data,
        response: await apiComponent.getEstimateVehicleCarbonController(data)
    }

    if (dataResponse == null || dataResponse == undefined) {
        console.error("Error : ", dataResponse);
    } else {
        let addCarRecordResponse = await dataBaseComponent.addCarRecordController(dataResponse)
        
        if (addCarRecordResponse) {
            // Get Users Stats
            var result = await dataBaseComponent.returnUserStatsController()
            win.webContents.send('database/car-record-added', result)
            // Refresh top 10 history
            let history = await dataBaseComponent.getAllRecordFromUserController()
            win.webContents.send('database/top-10-history', history.reverse())
            // Refresh most car used
            let mostCarUsed = await dataBaseComponent.getMostCarUsedController()
            win.webContents.send('database/most-car-used', mostCarUsed)
            // Refresh all History
            let allHistory = await dataBaseComponent.getAllRecordFromUserController()
            win.webContents.send('database/send-all-history', allHistory.reverse())
        }
    }
});

ipcMain.on('api/add-energy', async (event, data) => {
    const win = BrowserWindow.getAllWindows()[0];
    
    let dataResponse = {
        input: data,
        response: await apiComponent.getEstimateEnergyCarbonController(data)
    }

    if (dataResponse == null || dataResponse == undefined) {
        console.error("Error : ", dataResponse);
    } else {
        let addEnergyRecordResponse = await dataBaseComponent.addEnergyRecordController(dataResponse)
        
        if (addEnergyRecordResponse) {
            // Get Users Stats
            var result = await dataBaseComponent.returnUserStatsController()
            win.webContents.send('database/energy-record-added', result)
            // Refresh top 10 history
            let history = await dataBaseComponent.getAllRecordFromUserController()
            win.webContents.send('database/top-10-history', history.reverse())
            // Refresh all History
            let allHistory = await dataBaseComponent.getAllRecordFromUserController()
            win.webContents.send('database/send-all-history', allHistory.reverse())
        }
    }
});

// Redirect :
ipcMain.on('redirect/forgot-password', (event, data) => {
    windows.loadFile('./src/components/pages/register.html')
});

ipcMain.on('redirect/have-account', (event, data) => {
    windows.loadFile('./src/components/pages/login.html')
});

// Function :
function saveConfig(config, configPath) {
    fs.writeFileSync(configPath, JSON.stringify(config));
}

function loadConfig(configPath) {
    try {
      const configData = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(configData);
    } catch (err) {
      return {};
    }
}

// App :
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

        const config = loadConfig(dataPath);
        config.id = userData._id;

        saveConfig(config, dataPath);

        windows.loadFile('./src/components/pages/dashboard.html')

        // When Refresh App
        const win = BrowserWindow.getAllWindows()[0];

        win.webContents.on('did-finish-load', async () => {
            const win = BrowserWindow.getAllWindows()[0];
        
            // Summary Carbon
            var result = await dataBaseComponent.returnUserStatsController()
            win.webContents.send('database/send-user-stats', result)
            // Refresh History
            let history = await dataBaseComponent.getAllRecordFromUserController()
            win.webContents.send('database/top-10-history', history.reverse())
            // Refresh most car used
            let mostCarUsed = await dataBaseComponent.getMostCarUsedController()
            win.webContents.send('database/most-car-used', mostCarUsed)
            // Average consumption per day
            let averageConsumption = await dataBaseComponent.returnUserStatsController()
            win.webContents.send('database/average-consumption', averageConsumption)
        });

        
        var result = await dataBaseComponent.returnUserStatsController()
        win.webContents.send('database/send-user-stats', result)
        // Refresh History
        let history = await dataBaseComponent.getAllRecordFromUserController()
        win.webContents.send('database/top-10-history', history.reverse())
        // Refresh most car used
        let mostCarUsed = await dataBaseComponent.getMostCarUsedController()
        win.webContents.send('database/most-car-used', mostCarUsed)
    }
});

ipcMain.on("app/minimize", () => {
    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});
