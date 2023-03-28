const { ipcRenderer, contextBridge, ipcMain } = require('electron')

// Initialize API Send (minus & close button)
const API = {
    window: {
        close: () => ipcRenderer.send("appMain/close"),
        minimize: () => ipcRenderer.send("app/minimize")
    },
}

document.addEventListener('DOMContentLoaded', function() {
    // ========= App Event =========
    // Minus & Close Button :
    let closeButton = document.getElementById("close")
    let minButton = document.getElementById("minus")

    // Close Button Add => Close window addTask
    closeButton?.addEventListener("click", () => {
        ipcRenderer.send("app/close");
    })

    // Min Button Add => Minimize window addTask
    minButton?.addEventListener("click", () => {
        ipcRenderer.send("app/minimize");
    })


    // ========= DataBase Event =========
    // === Register User => Add user in DB ==
    document.getElementById('registerForm')?.addEventListener('submit', (event) => {
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

        if (email.length > 0 && password.length > 0) {
            ipcRenderer.send('db/add-user', {email, password, typeUsers});
        } else {
            document.getElementById("missingInformations").style.display = "block"
        }
    });

    // === Login User ==
    document.getElementById('loginForm')?.addEventListener('submit', (event) => {
        event.preventDefault();
    
        const formData = new FormData(event.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email.length > 0 && password.length > 0) {
            ipcRenderer.send('app/login-user', {email, password});
        } else {
            document.getElementById("missingInformations").style.display = "block"
        }
    });

    // === Login User => Forgot Password ==
    document.getElementById('login-ForgotPassword')?.addEventListener('click', (event) => {
        ipcRenderer.send('redirect/forgot-password');
    })

    document.getElementById('login-dontHaveAccount')?.addEventListener('click', (event) => {
        ipcRenderer.send('redirect/forgot-password');
    })

    // === Register User => Have Account ==
    document.getElementById('signup-HaveAccount')?.addEventListener('click', (event) => {
        ipcRenderer.send('redirect/have-account');
    })

    // ========= API Event =========
    // == Car "Add" Button ==
    let addCarButton = document.getElementById('addCarRecord')

    addCarButton?.addEventListener('click', () => {
        // Get Car type
        const carTypes = document.querySelectorAll('.dashboard-carPopupCarType');
        const selectedCarType = Array.from(carTypes).find(div => div.dataset.type === 'true');
        // Get Date Selected
        let dateInputSelect = (document.getElementById("dashboard-inputToday").dataset.select == "true") ? new Date().toISOString().slice(0, 10).replace(/-/g, '/') : document.getElementById("dashboard-inputDateAddRecord").value

        const data = {
            carType : (selectedCarType ? selectedCarType.innerHTML : null),
            years : document.getElementById('carYearsInput').value,
            km : parseInt(document.getElementById('carKmInput').value),
            date : dateInputSelect,
        }

        if (data.carType && data.years && data.km && data.date) {
            ipcRenderer.send('api/add-car', data);
        } else {
            document.getElementById('dashboard-carPopupError').style.color = "red"
            document.getElementById('dashboard-carPopupError').innerHTML = "Missing Information"
        }
    })
})

ipcRenderer.on('app/login-error', (event, data) => {
    document.getElementById('wrongInformations').style.display = "block"
})

ipcRenderer.on('database/car-record-added', (event, data) => {
    document.getElementById('dashboard-carPopupError').style.color = "yellowgreen"
    document.getElementById('dashboard-carPopupError').innerHTML = "Car added !"

    setInterval(() => {
        document.getElementById('dashboard-carPopupError').innerHTML = ""
    }, 5000)

});

contextBridge.exposeInMainWorld("app", API)