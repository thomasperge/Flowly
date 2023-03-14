const { ipcRenderer, contextBridge } = require('electron')

console.log("TEST PROLOAD");

// Initialize API Send
const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("app/minimize")
    },
}

/**
 * Close and minimize Window add task / Window Login
 */
document.addEventListener('DOMContentLoaded', function() {
    let closeButton = document.getElementById("close")
    let minButton = document.getElementById("minus")

    // Close Button Add => Close window addTask
    closeButton?.addEventListener("click", () => {
        ipcRenderer.send("app/close");
    })

    // Min Button Add => Minimize window addTask
    minButton?.addEventListener("click", () => {
        console.log("TEST MINUS");
        ipcRenderer.send("app/minimize");
    })
})

contextBridge.exposeInMainWorld("app", API)