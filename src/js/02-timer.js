// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
const dataStartBtn = document.querySelector('button[data-start]');
const daysOutput = document.querySelector('[data-days]');
const hoursOutput = document.querySelector('[data-hours]');
const minutesOutput = document.querySelector('[data-minutes]');
const secondsOutput = document.querySelector('[data-seconds]');

let intervalId = null;
dataStartBtn.disabled = 'disabled';

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if (this.selectedDates[0] > Date.now()) {
        dataStartBtn.disabled = null
      } else {
        return Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
}

const flatPickr = flatpickr(dateTimePicker, options);

function addLeadingZero(value) {
  return String(value).padStart(2, '0')
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const mins = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const secs = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, mins, secs };
};

const timer = {
  start() {
      let selectedTime = flatPickr.selectedDates[0].getTime();
      let currentTime = Date.now()
    intervalId = setInterval(() => {

      currentTime = Date.now()
      const deltaTime = selectedTime - currentTime;
      const { days, hours, mins, secs } = convertMs(deltaTime);

      daysOutput.textContent = days;
      hoursOutput.textContent = hours;
      minutesOutput.textContent = mins;
      secondsOutput.textContent = secs;

      if (deltaTime <= 1000) {
        clearInterval(intervalId)
      }

    }, 1000);


    dataStartBtn.disabled = 'disabled'
    }
  }

dataStartBtn.addEventListener('click', timer.start);

