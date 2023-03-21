// Import 
let button = document.getElementById('toggle-button')
let containerDashBoard2 = document.getElementById('dashboard-SCountainer2-2')
let addArea = document.getElementById("addArea")

let carButton = document.getElementById('fa-car')
let energyButton = document.getElementById('fa-oil-well')
let oilButton = document.getElementById('fa-bolt')

let carArea = document.getElementById('fa-car')
let energyArea = document.getElementById('fa-oil-well')
let oilArea = document.getElementById('fa-bolt')

let carAddDiv = false;
let energyAddDiv = false;

// == Button Plus / Minus ==
button?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-plus')) {
        addArea.style.display = "flex"

        button.classList.remove('fa-circle-plus');
        button.classList.add('fa-circle-minus');

        button.style.transform = "translateX(-230%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(-60%)";
            addArea.style.transition = "transform 0.5s";
        }, 10);
    } else {
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');

        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        setTimeout(() => {
            addArea.style.transform = "translateX(0%)";
            addArea.style.transition = "transform 0.5s";
        }, 4);

        addArea.style.display = "none"
    }
})

// Car Button :
carButton?.addEventListener('click', () => {

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
        button.style.transform = "translateX(0%)";
        button.style.transition = "transform 0.5s";

        addArea.style.transform = "translateX(0%)";
        addArea.style.transition = "transform 0.5s";

        addArea.style.display = "none"
    }

    button.classList.remove('fa-circle-minus');
    button.classList.add('fa-circle-plus');
})
