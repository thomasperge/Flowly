let button = document.getElementById('toggle-button')
let testArea = document.getElementById('testArea')
let containerDashBoard2 = document.getElementById('dashboard-SCountainer2-2')

let carButton = document.getElementById('fa-car')
let boltButton = document.getElementById('fa-bolt')
let addTransport = document.getElementById('dashboard-AddTransportArea')

let carAddDiv = false;
let energyAddDiv = false;

button?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-plus')) {
        button.classList.remove('fa-circle-plus');
        button.classList.add('fa-circle-minus');
        testArea.style.display = "flex"

    } else {
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');
        testArea.style.display = "none"
    }

    // A revoie car pas sur
    carAddDiv = false;
    energyAddDiv = false;
    document.getElementById('dashboard-AddEnergyArea').style.display = "none"
    document.getElementById('dashboard-AddTransportArea').style.display = "none"
})

containerDashBoard2?.addEventListener('click', (event) => {
    button.classList.remove('fa-circle-minus');
    button.classList.add('fa-circle-plus');
    testArea.style.display = "none"

    // A revoie car pas sur
    carAddDiv = false;
    energyAddDiv = false;
    document.getElementById('dashboard-AddEnergyArea').style.display = "none"
    document.getElementById('dashboard-AddTransportArea').style.display = "none"

})

carButton?.addEventListener('click', (event) => {
    // Delete Bolt Add
    document.getElementById('dashboard-AddEnergyArea').style.display = "none"
    energyAddDiv = false;

    if (carAddDiv) {
        document.getElementById('dashboard-AddTransportArea').style.display = "none"
        carAddDiv = false;
    } else {
        document.getElementById('dashboard-AddTransportArea').style.display = "block"
        carAddDiv = true;
    }
})

boltButton?.addEventListener('click', (event) => {
    // Delete Car Add
    document.getElementById('dashboard-AddTransportArea').style.display = "none"
    carAddDiv = false;

    if (energyAddDiv) {
        document.getElementById('dashboard-AddEnergyArea').style.display = "none"
        energyAddDiv = false;
    } else {
        document.getElementById('dashboard-AddEnergyArea').style.display = "block"
        energyAddDiv = true;
    }
})