// Main Import 
import { transitionOpacity } from './app.component.js'

let button = document.getElementById('toggle-button')
let addArea = document.getElementById("addArea")

// Popup unselect area
let unselect = document.getElementById('unselect')

// Set left button => Left popup
let leftButton = document.querySelectorAll('.fa-arrow-left')

// Set absolute div to display popup
let containerAddAbsolute = document.getElementById('dashboard-containerAddAbsolute')

// Set Button Car, Energy, Fuel
let carButton = document.getElementById('fa-car')
let energyButton = document.getElementById('fa-bolt')
let oilButton = document.getElementById('fa-oil-well')

// Set Area (popup) Car, Energy, Fuel
let carArea = document.getElementById('dashboard-areaCarButton')
let energyArea = document.getElementById('dashboard-areaEnergyButton')
let oilArea = document.getElementById('dashboard-areaOilButton')

// Set Error Title (popup)
let inputErrorCar = document.getElementById('dashboard-carPopupError')

// Set Area display boolean
let carDisplay = false
let energyDisplay = false
let oilDisplay = false

// =========== Button Plus / Minus for popup ===========
button?.addEventListener('click', (event) => {
    // Check : Button on "+" status
    if (button.classList.contains('fi-rr-square-plus')) {
        addArea.style.display = "flex"

        // Change + to - logo
        button.classList.remove('fi-rr-square-plus');
        button.classList.add('fi-rr-square-minus');

        // Transition
        button.style.transform = "translateX(-230%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(-60%)";
            addArea.style.transition = "transform 0.5s";
        }, 10);
    } else {
        // Change - to + logo
        button.classList.remove('fi-rr-square-minus');
        button.classList.add('fi-rr-square-plus');

        // Transition
        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(0%)";
            addArea.style.transition = "transform 0.5s";
        }, 4);

        unselect.style.display = "none"

        // Display "none" div to add
        addArea.style.display = "none"
        containerAddAbsolute.style.display = "none"
        // Car
        carDisplay = false
        carArea.style.display = "none"
        // Energy
        energyDisplay = false
        energyArea.style.display = "none"
        // Oil
        oilDisplay = false
        oilArea.style.display = "none"
    }
})

// =========== Car / Energy / Oil Button (on navbar) ===========
// == Car Button : ==
carButton?.addEventListener('click', () => {
    // Display "none" all other add area
    if (energyDisplay) {
        energyArea.style.display = "none"
        energyDisplay = false
    }
    if (oilDisplay) {
        oilArea.style.display = "none"
        oilDisplay = false
    }

    // Car event = Display Car Area
    if (carDisplay) {
        containerAddAbsolute.style.display = "none"
        unselect.style.display = "none"
        carArea.style.display = "none"
        carDisplay = false
    } else {
        inputErrorCar.dataset.error = "false"
        inputErrorCar.innerHTML = ""
        containerAddAbsolute.style.height = "33vh"
        containerAddAbsolute.style.display = "flex"
        unselect.style.display = "block"
        carArea.style.display = "block"
        carDisplay = true
    }
})
// == Energy Button : ==
energyButton?.addEventListener('click', () => {
    // Display "none" all other add area
    if (carDisplay) {
        carArea.style.display = "none"
        carDisplay = false
    }
    if (oilDisplay) {
        oilArea.style.display = "none"
        oilDisplay = false
    }

    // Energy event = Display Energy Area
    if (energyDisplay) {
        containerAddAbsolute.style.display = "none"
        unselect.style.display = "none"
        energyArea.style.display = "none"
        energyDisplay = false
    } else {
        containerAddAbsolute.style.display = "flex"
        unselect.style.display = "block"
        energyArea.style.display = "block"
        energyDisplay = true
    }
})
// == Oil Button : ==
oilButton?.addEventListener('click', () => {
    // Display "none" all other add area
    if (carDisplay) {
        carArea.style.display = "none"
        carDisplay = false
    }
    if (energyDisplay) {
        energyArea.style.display = "none"
        energyDisplay = false
    }

    // Energy event = Display Energy Area
    if (oilDisplay) {
        containerAddAbsolute.style.display = "none"
        unselect.style.display = "none"
        oilArea.style.display = "none"
        oilDisplay = false
    } else {
        containerAddAbsolute.style.display = "flex"
        unselect.style.display = "block"
        oilArea.style.display = "flex"
        oilDisplay = true
    }
})

// =========== Popup to add => Button "Today" or "Select Date" ===========
let todayButton = document.getElementById("dashboard-inputToday")
let addDateRecordButton = document.getElementById("dashboard-inputDateAddRecord")
let dateInputData = document.getElementById('dashboard-dateInput')

// ======== Manage Input : "Today" or "aaaa/mm/dd" ========
// Default Date - Today dataset-when
dateInputData.dataset.when =`${new Date().toLocaleDateString('fr-CA').split('/').reverse().join('-')}`

// == "Today" Button ==
todayButton?.addEventListener('click', () => {
    todayButton.style.borderWidth = "2.7px"
    addDateRecordButton.style.borderWidth = "1.5px"

    dateInputData.dataset.when = `${new Date().toLocaleDateString('fr-CA').split('/').reverse().join('-')}`
})
// == "Date" Input ==
addDateRecordButton?.addEventListener('click', () => {
    todayButton.style.borderWidth = "1.5px"
    addDateRecordButton.style.borderWidth = "2.7px"
})
// Put date in dataset-when
addDateRecordButton?.addEventListener('change', () => {
    dateInputData.dataset.when = addDateRecordButton.value
})

// =========== "Add" Button : Car / Energy / Oil ===========
let addCarButton = document.getElementById('addCarRecord')
let addEnergyButton = document.getElementById('addEnergyRecord')
let addOilButton = document.getElementById('addOilRecord')

// == Car "Add" Button ==
addCarButton?.addEventListener('click', () => {
    let carData = {
        brands: document.getElementById('carBrandsInput').value,
        models: document.getElementById('carModelsInput').value,
        years: document.getElementById('carYearsInput').value,
        km: document.getElementById('carKmInput').value,
        date: dateInputData.dataset.when
    }

    if (carData.brands == "" || carData.models == "" || carData.years == "" || carData.km == "" || carData.date == "") {
        inputErrorCar.innerHTML = "Error ! Missing Information"
        inputErrorCar.dataset.error = "true"
        containerAddAbsolute.style.height = "36vh"
    } else {
        // Delete Error : "Missing Information"
        inputErrorCar.dataset.error = "false"
        inputErrorCar.innerHTML = ""
        containerAddAbsolute.style.height = "32vh"

        carArea.style.display = "none"
        unselect.style.display = "none"
        carDisplay = false
    }
})
// == Energy "Add" Button ==
addEnergyButton?.addEventListener('click', () => {
    energyArea.style.display = "none"
    unselect.style.display = "none"
    energyDisplay = false
})

// =========== Transition to display button : Car / Energy / Oil ===========
addArea.addEventListener('transitionend', () => {
    if (button.classList.contains('fi-rr-square-plus')) {
        addArea.style.display = "none"
    } else {
        addArea.style.display = "flex"
    }
})


// =========== Unselect Area : (click) => Leave Popup ===========
unselect?.addEventListener('click', (event) => {
    if (button.classList.contains('fi-rr-square-minus')) {
        // Transition
        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        addArea.style.transform = "translateX(0%)";
        addArea.style.transition = "transform 0.5s";

        unselect.style.display = "none"

        // Display "none" all div
        addArea.style.display = "none"
        containerAddAbsolute.style.display = "none"
        // Car
        carDisplay = false
        carArea.style.display = "none"
        // Energy
        energyDisplay = false
        energyArea.style.display = "none"
        // Oil
        oilDisplay = false
        oilArea.style.display = "none"
    }

    // Class remove - & add +
    button.classList.remove('fi-rr-square-minus');
    button.classList.add('fi-rr-square-plus');
})

// =========== Popup : Left Button => Display "none" all area ===========
for (let i = 0; i < leftButton.length; i++) {
    leftButton[i].addEventListener('click', () => {
        carDisplay = false
        energyDisplay = false
        oilDisplay = false

        unselect.style.display = "none"
        carArea.style.display = "none"
        energyArea.style.display = "none"
        oilArea.style.display = "none"
    })
}

// =========== Dashboard : Overview Date Select (Overview / Week / Month / Year(s)) ===========
let dateTitle = document.querySelectorAll('.dashboard-overviewTitle')

for (let i = 0; i < dateTitle.length; i++) {
    dateTitle[i].addEventListener('click', () => {
        for (let j = 0; j <= dateTitle.length - 1; j++) {
            if (dateTitle[i].classList.contains(j.toString())) {
                dateTitle[j].classList.add("white")
                dateTitle[j].classList.remove("gray")
            } else {
                dateTitle[j].classList.add("gray")
                dateTitle[j].classList.remove("white")
            }
        }
    })
}

// =========== Switch : DashBoard => History => Premium => Profile ===========
// Get all button
let dashboardLogoNavbar = document.getElementById('logoDashboard')
let historyLogoNavbar = document.getElementById('logoHistory')
let diamondLogoNavbar = document.getElementById('logoDiamond')
let profileLogoNavbar = document.getElementById('logoProfile')

// Get all container
let dashboardContainer = document.querySelector('.dashboard-SCountainer2-2-2')
let historyContainer = document.querySelector('.history-SCountainer2-2-2')
let premiumContainer = document.querySelector('.premium-SCountainer2-2-2')
let profileContainer = document.querySelector('.profile-SCountainer2-2-2')

// Default display
dashboardContainer.style.display = "flex"
historyContainer.style.display = "none"
premiumContainer.style.display = "none"
profileContainer.style.display = "none"

// == DashBoard ==
dashboardLogoNavbar?.addEventListener('click', () => {
    console.log(historyContainer.style.display);
    // Logo
    historyLogoNavbar.classList.add('logoOff')
    historyLogoNavbar.classList.remove('logoOn')
    
    diamondLogoNavbar.classList.add('logoOff')
    diamondLogoNavbar.classList.remove('logoOn')

    profileLogoNavbar.classList.add('logoOff')
    profileLogoNavbar.classList.remove('logoOn')
    
    dashboardLogoNavbar.classList.remove('logoOff')
    dashboardLogoNavbar.classList.add('logoOn')

    // Container
    if (dashboardContainer.style.display == "none") {
        dashboardContainer.style.display = "flex"
        transitionOpacity(dashboardContainer, 170)
    } else {
        dashboardContainer.style.display = "flex"
    }

    // Undisplay all other container
    premiumContainer.style.display = "none"
    historyContainer.style.display = "none"
    profileContainer.style.display = "none"
})

// == History ==
historyLogoNavbar?.addEventListener('click', () => {
    // Logo
    dashboardLogoNavbar.classList.add('logoOff')
    dashboardLogoNavbar.classList.remove('logoOn')

    diamondLogoNavbar.classList.add('logoOff')
    diamondLogoNavbar.classList.remove('logoOn')

    profileLogoNavbar.classList.add('logoOff')
    profileLogoNavbar.classList.remove('logoOn')

    historyLogoNavbar.classList.remove('logoOff')
    historyLogoNavbar.classList.add('logoOn')

    // Container
    if (historyContainer.style.display == "none") {
        console.log("HERE 1");
        historyContainer.style.display = "flex"
        transitionOpacity(historyContainer, 170)
    } else {
        console.log("HERE 2");
        historyContainer.style.display = "flex"
    }

    // Undisplay all other container
    dashboardContainer.style.display = "none"
    premiumContainer.style.display = "none"
    profileContainer.style.display = "none"

    // Set random background-color for all history card
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

// == Premium ==
diamondLogoNavbar?.addEventListener('click', () => {
    // Logo
    historyLogoNavbar.classList.add('logoOff')
    historyLogoNavbar.classList.remove('logoOn')

    dashboardLogoNavbar.classList.add('logoOff')
    dashboardLogoNavbar.classList.remove('logoOn')

    profileLogoNavbar.classList.add('logoOff')
    profileLogoNavbar.classList.remove('logoOn')

    diamondLogoNavbar.classList.remove('logoOff')
    diamondLogoNavbar.classList.add('logoOn')

    // Container
    if (premiumContainer.style.display == "none") {
        premiumContainer.style.display = "flex"
        transitionOpacity(premiumContainer, 170)
    } else {
        premiumContainer.style.display = "flex"
    }
    
    // Undisplay all other container
    dashboardContainer.style.display = "none"
    historyContainer.style.display = "none"
    profileContainer.style.display = "none"
})

// == Profile ==
profileLogoNavbar?.addEventListener('click', () => {
    // Logo
    historyLogoNavbar.classList.add('logoOff')
    historyLogoNavbar.classList.remove('logoOn')

    dashboardLogoNavbar.classList.add('logoOff')
    dashboardLogoNavbar.classList.remove('logoOn')

    diamondLogoNavbar.classList.add('logoOff')
    diamondLogoNavbar.classList.remove('logoOn')

    profileLogoNavbar.classList.remove('logoOff')
    profileLogoNavbar.classList.add('logoOn')

    // Container
    if (profileContainer.style.display == "none") {
        profileContainer.style.display = "flex"
        transitionOpacity(profileContainer, 170)
    } else {
        profileContainer.style.display = "flex"
    }

    // Undisplay all other container
    dashboardContainer.style.display = "none"
    historyContainer.style.display = "none"
    premiumContainer.style.display = "none"
})

