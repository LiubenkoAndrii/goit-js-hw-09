const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

startButton.addEventListener('click', startChangingBodyColor);
stopButton.addEventListener('click', stopChangingBodyColor);

function startChangingBodyColor() {
  startButton.disabled = true;
  intervalId = setInterval(changeBodyColor, 1000);
}

function stopChangingBodyColor() {
  startButton.disabled = false;
  clearInterval(intervalId);
}

function changeBodyColor() {
  const body = document.querySelector('body');
  const color = getRandomHexColor();
  body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}

