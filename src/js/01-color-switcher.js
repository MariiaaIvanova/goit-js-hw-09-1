function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const dataStart = document.querySelector('button[data-start]');
const dataStop = document.querySelector('button[data-stop]');
let intervalId = null;

dataStart.addEventListener("click", () => {

    dataStart.disabled = true;
    dataStop.disabled = false;
    
    intervalId = setInterval(() => {  

        const randomColor = getRandomHexColor();
        body.style.backgroundColor = randomColor;      

    }, 1000);
});

dataStop.addEventListener("click", () => {

    dataStop.disabled = true;
    dataStart.disabled = false;  
    
  clearInterval(intervalId);  
});





