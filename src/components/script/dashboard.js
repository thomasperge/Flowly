let button = document.getElementById('toggle-button')

button.addEventListener('click', (event) => {
    console.log("HERE");

    if (button.classList.contains('fa-circle-plus')) {
        button.classList.remove('fa-circle-plus');
        button.classList.add('fa-circle-minus');
    } else {
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');
    }
})