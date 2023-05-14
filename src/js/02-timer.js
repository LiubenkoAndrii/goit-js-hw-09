import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');
const daysElement = timer.querySelector('[data-days]');
const hoursElement = timer.querySelector('[data-hours]');
const minutesElement = timer.querySelector('[data-minutes]');
const secondsElement = timer.querySelector('[data-seconds]');

let countdownInterval;
let countDownDate;

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      countDownDate = selectedDate.getTime();
    }
    startButton.disabled = !selectedDate;
  },
});

function startCountdown() {
  if (!countDownDate) {
    return;
  }

  const differenceMs = countDownDate - new Date().getTime();

  if (differenceMs < 0) {
    clearInterval(countdownInterval);
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(differenceMs);

  daysElement.textContent = padNumber(days);
  hoursElement.textContent = padNumber(hours);
  minutesElement.textContent = padNumber(minutes);
  secondsElement.textContent = padNumber(seconds);
}

function padNumber(number) {
  return String(number).padStart(2, '0');
}

function convertMs(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const days = Math.floor(totalHours / 24);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

startButton.addEventListener('click', () => {
  countdownInterval = setInterval(startCountdown, 1000);
  startButton.disabled = true;
});
