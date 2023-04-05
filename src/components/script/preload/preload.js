const { ipcRenderer, contextBridge } = require('electron')
const { Chart, registerables } = require('chart.js');
const { getCurrentDate } = require('../date')

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
        const name = formData.get('name');
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

        if (email.length > 0 && password.length > 0 && name.length > 0) {
            ipcRenderer.send('database/add-user', {name, email, password, typeUsers});
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
    addCarButton?.addEventListener('click', async () => {
        // Get Car type
        const carTypes = document.querySelectorAll('.dashboard-carPopupCarType');
        const selectedCarType = Array.from(carTypes).find(div => div.dataset.type === 'true');

        // Get Date Selected
        let dateInputSelect = (document.getElementById("dashboard-inputToday").dataset.select == "true") ? await getCurrentDate() : document.getElementById("dashboard-inputDateAddRecord").value

        const data = {
            carType : (selectedCarType ? selectedCarType.innerHTML : null),
            years : document.getElementById('carYearsInput').value,
            km : parseInt(document.getElementById('carKmInput').value),
            date : dateInputSelect,
        }

        if (data.carType && data.years && data.km) {
            ipcRenderer.send('api/add-car', data);
        } else {
            document.getElementById('dashboard-carPopupError').style.color = "red"
            document.getElementById('dashboard-carPopupError').innerHTML = "Missing Information"
        }
    })

    // == Energy "Add" Button ==
    let addEnergyButton = document.getElementById('addEnergyRecord')
    addEnergyButton?.addEventListener('click', async () => {

        const data = {
            country : document.getElementById('addEnergyCountry').value,
            unit : document.getElementById('addEnergyUnit').value,
            value : parseInt(document.getElementById('addEnergyValue').value),
            date : await getCurrentDate(),
        }

        if (data.country && data.unit && data.value) {
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

    // == Profile ==
    let profileLogo = document.getElementById('logoProfile')
    profileLogo?.addEventListener('click', () => {
        ipcRenderer.send('database/profile-username')
    })

    // == Contact "send" button ==
    let contactSend = document.getElementById('contact-buttonSend')
    contactSend.addEventListener('click', () => {
        let data = {
            text : document.getElementById('contactText').value
        }

        if (data.text) {
            ipcRenderer.send('contact/send-request', data)
            document.getElementById('contactText').value = ""
        }
    })
})

// ======== Function ========
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

// ======== Ipc Renderer On ========
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

ipcRenderer.on('database/average-consumption', (event, data) => {
    document.getElementById('averageElectricDay').innerHTML = formatNumber(data._doc.total_carbon_electricity/365)
    document.getElementById('averageCarDay').innerHTML = formatNumber(data._doc.total_carbon_vehicle/365)
    document.getElementById('averageFuelDay').innerHTML = formatNumber(data._doc.total_carbon_fuel/365)
})

ipcRenderer.on('database/last-10-days', (event, data) => {
    let carData = data[0].reverse()
    let energyData = data[1].reverse()
    let fuelData = data[2].reverse()

    Chart.register(...registerables);
    const ctx = document.querySelector('#myChart');
    const oldChart = Chart.getChart(ctx);

    if (oldChart) {
        oldChart.destroy();
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: [carData[0].day.slice(5), carData[1].day.slice(5), carData[2].day.slice(5), carData[3].day.slice(5), carData[4].day.slice(5), carData[5].day.slice(5), carData[6].day.slice(5), carData[7].day.slice(5), carData[8].day.slice(5), carData[9].day.slice(5)],
            datasets: [{
                data: [carData[0].carbon, carData[1].carbon, carData[2].carbon, carData[3].carbon, carData[4].carbon, carData[5].carbon, carData[6].carbon, carData[7].carbon, carData[8].carbon, carData[9].carbon],
                fill: false,
                borderColor: "#c2bbf0",
                tension: 0.3,
                borderWidth: 3.5,
            },
            {
                data: [energyData[0].carbon, energyData[1].carbon, energyData[2].carbon, energyData[3].carbon, energyData[4].carbon, energyData[5].carbon, energyData[6].carbon, energyData[7].carbon, energyData[8].carbon, energyData[9].carbon],
                fill: false,
                borderColor: "#f1e3f3",
                tension: 0.3,
                borderWidth: 3.5,
            },
            {
                data: [fuelData[0].carbon, fuelData[1].carbon, fuelData[2].carbon, fuelData[3].carbon, fuelData[4].carbon, fuelData[5].carbon, fuelData[6].carbon, fuelData[7].carbon, fuelData[8].carbon, fuelData[9].carbon],
                fill: false,
                borderColor: "#8fb8ed",
                tension: 0.3,
                borderWidth: 3.5,
            }]
        },
        options: {
            maintainAspectRatio: false,
            layout: {
                padding: {
                    top: 1,
                    bottom: 1,
                    left: 12,
                    right: 12
                },
            },
            elements: {
                point: { radius: 0 },
            },
            plugins: {
                legend: false // Hide legend
            },
            scales: {
                y: {
                    display: false // Hide Y axis labels
                },
                x: {
                    display: true // Hide X axis labels
                }
            },
        }
    });
})

ipcRenderer.on('database/profile-display-account', (event, data) => {
    // Date
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const date = new Date();
    const formattedDate = date.toLocaleDateString('fr-FR', options).replace(/\b\d{1,2}(st|nd|rd|th)\b/g, '$& ');
    document.getElementById('profileDate').innerHTML = `${formattedDate}`

    // Welcome
    document.getElementById('profileWelcome').innerHTML = `Welcome, ${data._doc.name}`
})

ipcRenderer.on('contact/send-request-message', (event, data) => {
    if (data.sucess) {
        document.querySelector('.contact-sucessMessageContainer').style.display = "flex"
        document.querySelector('.contact-sucessMessage').style.color = "#2ff71c"
        document.querySelector('.contact-sucessMessage').innerHTML = "Send message!"
    } else {
        document.querySelector('.contact-sucessMessageContainer').style.display = "flex"
        document.querySelector('.contact-sucessMessage').style.color = "#f71c1c"
        document.querySelector('.contact-sucessMessage').innerHTML = "Error, the message is not sent..."
    }

    setInterval(() => {
        document.querySelector('.contact-sucessMessageContainer').style.display = "none"
        document.querySelector('.contact-sucessMessage').innerHTML = ""
    }, 3000)
})

contextBridge.exposeInMainWorld("app", API)