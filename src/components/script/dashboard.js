// Main Import 
import { transitionOpacity } from './app.component.js'

let button = document.getElementById('toggle-button')
let addArea = document.getElementById("addArea")
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

// Set Area display boolean
let carDisplay = false
let energyDisplay = false
let oilDisplay = false

// ======= Button Plus / Minus for popup =======
button?.addEventListener('click', (event) => {
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

// ======= Logo Button =======
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

// ======= Transition => Display Logo to add things =======
addArea.addEventListener('transitionend', () => {
    if (button.classList.contains('fi-rr-square-plus')) {
        addArea.style.display = "none"
    } else {
        addArea.style.display = "flex"
    }
})


// ======= Click Container2.2 => Display "none" minus button =======
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

    button.classList.remove('fi-rr-square-minus');
    button.classList.add('fi-rr-square-plus');
})

// ======= Left Button => Display "none" all area =======
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

// ======= Dashboard : Overview Date Select =======
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

// == Switch : DashBoard => History => Premium ==
let dashboardLogoNavbar = document.getElementById('logoDashboard')
let historyLogoNavbar = document.getElementById('logoHistory')
let diamondLogoNavbar = document.getElementById('logoDiamond')

let dashboardContainer = document.querySelector('.dashboard-SCountainer2-2-2')
let premiumContainer = document.querySelector('.premium-SCountainer2-2-2')

// ======= Dashboard : History / Dashboard / Premium Page - Logo switch =======
dashboardLogoNavbar?.addEventListener('click', () => {
    historyLogoNavbar.classList.add('logoOff')
    historyLogoNavbar.classList.remove('logoOn')
    
    dashboardLogoNavbar.classList.remove('logoOff')
    dashboardLogoNavbar.classList.add('logoOn')
    
    diamondLogoNavbar.classList.add('logoOff')
    diamondLogoNavbar.classList.remove('logoOn')
    
    if (dashboardContainer.style.display == "none") {
        dashboardContainer.style.display = "flex"
        transitionOpacity(dashboardContainer, 150)
    } else {
        dashboardContainer.style.display = "flex"
        premiumContainer.style.display = "none"
    }
    
})
historyLogoNavbar?.addEventListener('click', () => {
    historyLogoNavbar.classList.remove('logoOff')
    historyLogoNavbar.classList.add('logoOn')

    dashboardLogoNavbar.classList.add('logoOff')
    dashboardLogoNavbar.classList.remove('logoOn')

    diamondLogoNavbar.classList.add('logoOff')
    diamondLogoNavbar.classList.remove('logoOn')

    dashboardContainer.style.display = "none"
    premiumContainer.style.display = "none"
})
diamondLogoNavbar?.addEventListener('click', () => {
    historyLogoNavbar.classList.add('logoOff')
    historyLogoNavbar.classList.remove('logoOn')

    dashboardLogoNavbar.classList.add('logoOff')
    dashboardLogoNavbar.classList.remove('logoOn')

    diamondLogoNavbar.classList.remove('logoOff')
    diamondLogoNavbar.classList.add('logoOn')

    dashboardContainer.style.display = "none"
    premiumContainer.style.display = "flex"
    transitionOpacity(premiumContainer, 150)
})