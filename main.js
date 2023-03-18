// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
require('dotenv').config();

// DataBase
const { userSchema } = require('./models/account.js');
const { recordsSchema } = require('./models/account.js');
const { typeUsers } = require('./models/enum.js');

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
            preload: path.join(__dirname, "./src/components/script/preload/preload.js") // use a preload script
        }
    })
  
    windows.loadFile('./src/components/pages/register.html')
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
    const User = mongoose.model('account', recordsSchema);

    const newUser = new User({
        type: typeUsers[0],
        email: "thomas74",
        username: "thomas",
        password: "thomas",
    });

    newUser.save().then(() => console.log('User create'));

    // User.find({ idAccount: "3c71e6e3-e084-47db-ac2f-2993a568b03d" })
    // .then((records) => {
    //     console.log(records); // Tous les enregistrements avec l'idAccount correspondant à userId
    // })
    // .catch((err) => {
    //     console.log(err);
    // });

    // const apiKey = process.env.TOKEN_CARBON_INTERFACE;

    // axios.post('https://www.carboninterface.com/api/v1/estimates', {
    //     "type": "electricity",
    //     "electricity_unit": "mwh",
    //     "electricity_value": 42,
    //     "country": "us",
    //     "state": "fl"
    // }, {
    //     headers: {
    //         Authorization: `Bearer ${apiKey}`,
    //         'Content-Type': 'application/json',
    //     }
    // })
    // .then(response => {
    //     const responseData = response.data;
    //     console.log(responseData.data);
    // })
    // .catch(error => {
    //     console.error(error);
    // });

    windows.minimize();
});

ipcMain.on("app/close", () => {
    app.quit()
});