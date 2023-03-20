let button = document.getElementById('toggle-button')
let testArea = document.getElementById('testArea')
let containerDashBoard2 = document.getElementById('dashboard-SCountainer2-2')
var opacite = 0;

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
})

containerDashBoard2?.addEventListener('click', (event) => {
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');
        testArea.style.display = "none"
})