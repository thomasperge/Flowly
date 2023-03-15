// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');


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

// Exemple d'utilisation de la fonction de connexion à MongoDB
app.on('ready', async () => {
    // Replace the placeholders with your credentials and hostname
    const uri = 'mongodb+srv://Thomasperge:RonnieColeman74360-@flowly.wyde8da.mongodb.net/?retryWrites=true&w=majority';
    // Create a MongoClient with a MongoClientOptions object to set the Stable API version
    const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
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
