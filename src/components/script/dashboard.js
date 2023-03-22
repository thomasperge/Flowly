// Import 
let button = document.getElementById('toggle-button')
let addArea = document.getElementById("addArea")
let unselect = document.querySelector('.dashboard-unselect')

let leftButton = document.querySelectorAll('.fa-arrow-left')

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
unselect?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-minus')) {
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

    button.classList.remove('fa-circle-minus');
    button.classList.add('fa-circle-plus');
})

// == Left Button => Display "none" all area ==
for (let i = 0; i < leftButton.length; i++) {
    leftButton[i].addEventListener('click', () => {
        carDisplay = false
        energyDisplay = false
        oilDisplay = false
        console.log(carDisplay, energyDisplay, oilDisplay);
        unselect.style.display = "none"
        carArea.style.display = "none"
        energyArea.style.display = "none"
        oilArea.style.display = "none"
    })
}


// Dashbaord : Overview Date Select
var dateTitle = document.querySelectorAll('.dashboard-overviewTitle')
for (let i = 0; i < dateTitle.length; i++) {

    dateTitle[i].addEventListener('click', () => {
        for (let j = 0; j <= dateTitle.length - 1; j++) {
            console.log(dateTitle[j]);

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