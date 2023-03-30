const { ipcRenderer, contextBridge } = require('electron')

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


    // ========= Database Event =========
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
            ipcRenderer.send('database/add-user', {email, password, typeUsers});
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
        console.log(dateInputSelect);

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

    // == Energy "Add" Button ==
    let addEnergyButton = document.getElementById('addEnergyRecord')
    addEnergyButton?.addEventListener('click', () => {

        const data = {
            country : document.getElementById('addEnergyCountry').value,
            unit : document.getElementById('addEnergyUnit').value,
            value : parseInt(document.getElementById('addEnergyValue').value),
            date : new Date().toISOString().slice(0, 10).replace(/-/g, '/'),
        }
        console.log(data.date);


        if (data.country && data.unit && data.value) {
            console.log("ALL GOOD");
            ipcRenderer.send('api/add-energy', data);
        } else {
            document.getElementById('dashboard-energyPopupError').style.color = "red"
            document.getElementById('dashboard-energyPopupError').innerHTML = "Missing Information"
        }
    })

    // == History ==
    let historyLogoNavbar = document.getElementById('logoHistory')

    historyLogoNavbar?.addEventListener('click', () => {
        ipcRenderer.send('database/display-history');
    })

})

// ======== Function========
function formatNumber(number) {
    number = number.toFixed(2);
    const prefixes = ['', 'K', 'M', 'B'];
    const base = 1000;

    const isNegative = number < 0;
    number = Math.abs(number);

    if (number < base) {
      return isNegative ? '-' + number : number.toString();
    }

    const log = Math.floor(Math.log10(number) / Math.log10(base));
    const prefix = prefixes[log];

    const value = number / Math.pow(base, log);

    const formattedValue = value.toFixed(2);

    return (isNegative ? '-' : '') + formattedValue + prefix;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

function formatDate2(dateStr) {
    const date = new Date(dateStr);
    const options = {
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
}

// ======== Ipc On ========
ipcRenderer.on('app/login-error', (event, data) => {
    document.getElementById('wrongInformations').style.display = "block"
})

ipcRenderer.on('database/send-user-stats', (event, data) => {
    document.getElementById('carCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_vehicle)
    document.getElementById('electricityCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_electricity)
    document.getElementById('fuelCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_fuel)
    document.getElementById('flightCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_flight)
})

ipcRenderer.on('database/car-record-added', (event, data) => {
    // Refresh Data
    document.getElementById('carCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_vehicle)
    document.getElementById('electricityCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_electricity)
    document.getElementById('fuelCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_fuel)
    document.getElementById('flightCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_flight)
    
    // Popup Message
    document.getElementById('dashboard-carPopupError').style.color = "yellowgreen"
    document.getElementById('dashboard-carPopupError').innerHTML = "Car added !"

    // Interval
    setInterval(() => {
        document.getElementById('dashboard-carPopupError').innerHTML = ""
    }, 3000)
});

ipcRenderer.on('database/energy-record-added', (event, data) => {
    // Refresh Data
    document.getElementById('carCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_vehicle)
    document.getElementById('electricityCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_electricity)
    document.getElementById('fuelCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_fuel)
    document.getElementById('flightCarbonStats').innerHTML = formatNumber(data._doc.total_carbon_flight)
    
    // Popup Message
    document.getElementById('dashboard-energyPopupError').style.color = "yellowgreen"
    document.getElementById('dashboard-energyPopupError').innerHTML = "Bill added !"

    // Interval
    setInterval(() => {
        document.getElementById('dashboard-energyPopupError').innerHTML = ""
    }, 3000)
});

ipcRenderer.on('database/send-all-history', (event, result) => {
    const container = document.querySelector('.history-mainContainer');
    container.innerHTML = ""

    for(let i = 0; i <= result.length - 1; i++) {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="history-area flex">
            <div class="history-areaContainer">
                <div class="history-areaContainerOverview">
                    <span class="history-areaContainerTitle flex">
                        <i class="fi fi-br-time-past flex" style="font-size: 2.1vh;"></i>
                        ${result[i]._doc.record_type}
                    </span>
                    <span class="history-areaContainerDate flex">${formatDate(result[i]._doc.dateInput)}</span>
                    </div>
                    <div class="history-areaContainerOverview">
                    <span class="history-areaContainerDesc flex">${result[i]._doc.description_record}</span>
                    </div>
                <div class="history-areaContainerData flex">
                    <div class="history-areaContainerDataKm flex">${result[i]._doc.string_value}</div>
                    <div>|</div>
                    <div class="history-areaContainerDataCo2 flex">${result[i]._doc.carbon_kg} kg</div>
                    </div>
                </div>
            </div>
        `;

        container.appendChild(div);
    }

    let history = document?.querySelectorAll('.history-area')

    for (let i = 0; i < history.length; i++) {
        // Check if history-card has already background-color
        if (history[i].classList.contains("HistoryColor-1") || history[i].classList.contains("HistoryColor-2") || history[i].classList.contains("HistoryColor-3") || history[i].classList.contains("HistoryColor-4") || history[i].classList.contains("HistoryColor-5") || history[i].classList.contains("HistoryColor-6")) {
            var randomColor = Math.round(Math.random() * 5) + 1
            history[i].classList = []
            history[i].classList.add("history-area")
            history[i].classList.add("flex")
            history[i].classList.add(`HistoryColor-${randomColor}`)
        } else {
            var randomColor = Math.round(Math.random() * 5) + 1
            history[i].classList.add(`HistoryColor-${randomColor}`)
        }
    }
})

ipcRenderer.on('database/top-10-history', (event, result) => {
    if (result.length > 0) {
        const container = document.querySelector('.dashboard-statsContainer2-1');
        container.innerHTML = ""
    
        let final = (result.length >= 10) ? 9 : result.length
        
        for(let i = 0; i <= final-1; i++) {
            let percentage = (result[i+1] != undefined) ? result[i]._doc.carbon_kg - result[i + 1]._doc.carbon_kg : 0
            let color = (percentage > 0) ? "rgba(255, 0, 0, 0.404)" : "rgba(0, 255, 76, 0.404)"
            
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="dashboard-statsArea2-1 flex">
                    <div class="dashboard-statsArea2-1Container">
                        <div class="dashboard-statsArea2-1Title">${result[i]._doc.record_type} - ${result[i]._doc.description_record}</div>
                        <div class="dashboard-statsArea2-1Date">${formatDate2(result[i]._doc.dateInput)}</div>
                        <div class="dashboard-statsArea2-1ContainerData">
                            <div class="dashboard-statsArea2-1Data">${result[i]._doc.string_value} - ${formatNumber(result[i]._doc.carbon_kg)} kg</div>
                            <div class="dashboard-statsArea2-1Percentage" style="background-color:${color}">${formatNumber(percentage)}%</div>
                        </div>
                    </div>
                </div>
            `;
    
            container.appendChild(div);
        }
    }
})

ipcRenderer.on('database/most-car-used', (event, result) => {
    if (result != null) {
        const container = document.querySelector('.dashboard-statsArea1-2-1ContainerData');
        container.innerHTML = ""
        
        const card1 = document.createElement('div');
        card1.classList.add('dashboard-statsArea1-2-1AreaData', 'StatsColor-5', 'flex');
        card1.innerHTML = `
            <div class="dashboard-statsArea1-2-1AreaContainerData">
                <div class="dashboard-statsArea1-2-1AreaContainerDataTitleContainer">
                    <div class="dashboard-statsArea1-2-1AreaContainerTitleBrand">${result[0][1].string_name}</div>
                    <div class="dashboard-statsArea1-2-1AreaContainerDescBrand">${result[0][0]}</div>
                </div>
                
                <div class="dashboard-statsArea1-2-1AreaContainerDataContainer">
                    <div class="dashboard-statsArea1-2-1AreaContainerDataGraphArea">
                        <div class="dashboard-statsArea1-2-1AreaContainerKmTitle flex">${formatNumber(result[0][1].total_distance)}</div>
                        <div class="dashboard-statsArea1-2-1AreaContainerCo2Title flex">km</div>
                    </div>
                    <div class="dashboard-statsArea1-2-1AreaContainerDataGraphArea">
                        <div class="dashboard-statsArea1-2-1AreaContainerKmTitle flex">${formatNumber(result[0][1].total_carbon_kg)}</div>
                        <div class="dashboard-statsArea1-2-1AreaContainerCo2Title flex">Co²</div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card1);

        const card2 = document.createElement('div');
        card2.classList.add('dashboard-statsArea1-2-1AreaData', 'StatsColor-6', 'flex');
        card2.innerHTML = `
            <div class="dashboard-statsArea1-2-1AreaContainerData">
                <div class="dashboard-statsArea1-2-1AreaContainerDataTitleContainer">
                    <div class="dashboard-statsArea1-2-1AreaContainerTitleBrand">${result[1][1].string_name}</div>
                    <div class="dashboard-statsArea1-2-1AreaContainerDescBrand">${result[1][0]}</div>
                </div>
                
                <div class="dashboard-statsArea1-2-1AreaContainerDataContainer">
                    <div class="dashboard-statsArea1-2-1AreaContainerDataGraphArea">
                        <div class="dashboard-statsArea1-2-1AreaContainerKmTitle flex">${formatNumber(result[1][1].total_distance)}</div>
                        <div class="dashboard-statsArea1-2-1AreaContainerCo2Title flex">km</div>
                    </div>
                    <div class="dashboard-statsArea1-2-1AreaContainerDataGraphArea">
                        <div class="dashboard-statsArea1-2-1AreaContainerKmTitle flex">${formatNumber(result[1][1].total_carbon_kg)}</div>
                        <div class="dashboard-statsArea1-2-1AreaContainerCo2Title flex">Co²</div>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card2);
    } else {
        const container = document.querySelector('.dashboard-statsArea1-2-1ContainerData');
        container.innerHTML = "No data"
    }
})

contextBridge.exposeInMainWorld("app", API)