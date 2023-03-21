let button = document.getElementById('toggle-button')
let containerDashBoard2 = document.getElementById('dashboard-SCountainer2-2')
let addArea = document.getElementById("addArea")

let carAddDiv = false;
let energyAddDiv = false;

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

addArea.addEventListener('transitionend', () => {
    if (button.classList.contains('fa-circle-plus')) {
        addArea.style.display = "none"
    } else {
        addArea.style.display = "flex"
    }
})


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
