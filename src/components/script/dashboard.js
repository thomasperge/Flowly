let button = document.getElementById('toggle-button')
let testArea = document.getElementById('testArea')

testArea?.addEventListener('transitionend', () => {
    console.log("HERRRRRRRRRRRRE");
    if (testArea.style.opacity === "0") {
      testArea.style.display = "none";
    }
});

button?.addEventListener('click', (event) => {
    if (button.classList.contains('fa-circle-plus')) {
        button.classList.remove('fa-circle-plus');
        button.classList.add('fa-circle-minus');
        testArea.style.display = "flex"
        testArea.style.opacity = 1;
    } else {
        button.classList.remove('fa-circle-minus');
        button.classList.add('fa-circle-plus');
        testArea.style.display = "none"
        testArea.style.opacity = 0;
    }
})
