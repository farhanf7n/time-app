const lapButton = document.getElementById("btn-lap");
const resetButton = document.getElementById("btn-reset");
const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const lapsTable = document.getElementById("tbl-laps");
const tableBody = document.getElementsByTagName("tbody");

let days = 0;
let hour = 0;
let minute = 0;
let second = 0;
let milliseconds = 0;

// Start the stopwatch
function startStopWatch() {
  milliseconds++;
  if (milliseconds == 1000) {
    second++;
    milliseconds = 0;
  }

  if (second == 60) {
    minute++;
    second = 0;
  }

  if (minute == 60) {
    hour++;
    minute = 0;
  }

  if (hour == 24) {
    days++;
    hour = 0;
  }

  milliseconds = milliseconds.toString().padStart(3, "0");
  second = second.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");

  let daysEl = document.getElementsByClassName("days")[0];
  let hoursEl = document.getElementsByClassName("hours")[0];
  let minutesEl = document.getElementsByClassName("minutes")[0];
  let secondsEl = document.getElementsByClassName("seconds")[0];
  let millisecondsEl = document.getElementsByClassName("milliseconds")[0];

  daysEl.innerHTML = days + ":";
  hoursEl.innerHTML = hour + ":";
  minutesEl.innerHTML = minute + ":";
  secondsEl.innerHTML = second + ":";
  millisecondsEl.textContent = milliseconds;

  setInterval(startStopWatch, 100);
}

// Pause the stopwatch
function pauseStopWatch() {}

startButton.addEventListener("click", function () {
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  lapButton.classList.remove("hidden");
  resetButton.classList.add("hidden");
  startStopWatch();
});

pauseButton.addEventListener("click", function () {
  startButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  lapButton.classList.add("hidden");
  resetButton.classList.remove("hidden");
  clearTimeout(startStopWatch());
});
