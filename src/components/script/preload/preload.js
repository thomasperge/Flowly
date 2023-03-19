const { ipcRenderer, contextBridge } = require('electron')

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

    // === Register User ==
    document.getElementById('myForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');
        let typeUsers;

        const radios = document.querySelectorAll('input[type="radio"]');

        for (const radio of radios) {
            if (radio.checked) {
                typeUsers = radio.value;
                break;
            }
        }

        ipcRenderer.send('form-data', {email, password, typeUsers});
    });
})

contextBridge.exposeInMainWorld("app", API)