// Import 
let button = document.getElementById('toggle-button')
let containerDashBoard2 = document.getElementById('dashboard-SCountainer2-2')
let addArea = document.getElementById("addArea")

// Div Add Menu
let containerAddAbsolute = document.getElementById('dashboard-containerAddAbsolute')

let carButton = document.getElementById('fa-car')
let energyButton = document.getElementById('fa-bolt')
let oilButton = document.getElementById('fa-oil-well')

let carArea = document.getElementById('dashboard-areaCarButton')
let energyArea = document.getElementById('dashboard-areaEnergyButton')
let oilArea = document.getElementById('dashboard-areaOilButton')

var carDisplay = false
var energyDisplay = false
var oilDisplay = false

// == Button Plus / Minus ==
button?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-plus')) {
        addArea.style.display = "flex"

        // Change + to - logo
        button.classList.remove('fa-circle-plus');
        button.classList.add('fa-circle-minus');

        // Transition
        button.style.transform = "translateX(-230%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(-60%)";
            addArea.style.transition = "transform 0.5s";
        }, 10);
    } else {
        // Change - to + logo
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');

        // Transition
        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(0%)";
            addArea.style.transition = "transform 0.5s";
        }, 4);

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
        carArea.style.display = "none"
        carDisplay = false
    } else {
        containerAddAbsolute.style.display = "flex"
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
        energyArea.style.display = "none"
        energyDisplay = false
    } else {
        containerAddAbsolute.style.display = "flex"
        energyArea.style.display = "flex"
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
        oilArea.style.display = "none"
        oilDisplay = false
    } else {
        containerAddAbsolute.style.display = "flex"
        oilArea.style.display = "flex"
        oilDisplay = true
    }
})

// == Transition => Display Logo to add things ==
addArea.addEventListener('transitionend', () => {
    if (button.classList.contains('fa-circle-plus')) {
        addArea.style.display = "none"
    } else {
        addArea.style.display = "flex"
    }
})


// == Click Container2.2 => Display "none" minus button ==
// ( a revoir car si il a les grahs par dessus = plus a dispo)
containerDashBoard2?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-minus')) {
        // Transition
        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        addArea.style.transform = "translateX(0%)";
        addArea.style.transition = "transform 0.5s";

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

    button.classList.remove('fa-circle-minus');
    button.classList.add('fa-circle-plus');
})



const incrementBtn = document.getElementById("incrementBtn");
const decrementBtn = document.getElementById("decrementBtn");
const myNumber = document.getElementById("myNumber");

incrementBtn.addEventListener("click", function() {
  myNumber.stepUp();
});

decrementBtn.addEventListener("click", function() {
  myNumber.stepDown();
});