// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        frame: false,
        autoHideMenuBar: true,
        width: 500,
        height: 345,
        resizable: false,
    })
  
    win.loadFile('src/pages/index.html')
}

app.whenReady().then(() => {
    createWindow()
})