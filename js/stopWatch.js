const lapButton = document.getElementById("btn-lap");
const resetButton = document.getElementById("btn-reset");
const startButton = document.getElementById("btn-start");
const pauseButton = document.getElementById("btn-pause");
const lapsTable = document.getElementById("tbl-laps");
const daysEl = document.getElementsByClassName("days")[0];
const hoursEl = document.getElementsByClassName("hours")[0];
const minutesEl = document.getElementsByClassName("minutes")[0];
const secondsEl = document.getElementsByClassName("seconds")[0];
const lapResults = document.getElementsByClassName("lap_result")[0];

let days = 0;
let hour = 0;
let minute = 0;
let second = 0;
let count = 0;

// Start the stopwatch
let intervalId;

// Fixes the leading zero issue
function fixLeadingZero() {
  second = second.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");
}

// Stopwatch functionality
function startStopWatch() {
  second++;
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

  fixLeadingZero();

  daysEl.innerHTML = days + ":";
  hoursEl.innerHTML = hour + ":";
  minutesEl.innerHTML = minute + ":";
  secondsEl.innerHTML = second;
}

// Start the stopwatch
startButton.addEventListener("click", function () {
  startButton.classList.add("hidden");
  pauseButton.classList.remove("hidden");
  lapButton.classList.remove("hidden");
  resetButton.classList.add("hidden");
  intervalId = setInterval(startStopWatch, 1000); // Changed from 10 to 1000
});

// Pause the stopwatch
pauseButton.addEventListener("click", function () {
  startButton.classList.remove("hidden");
  pauseButton.classList.add("hidden");
  lapButton.classList.add("hidden");
  resetButton.classList.remove("hidden");
  clearInterval(intervalId);
});

// Reset the stopwatch and table
resetButton.addEventListener("click", function () {
  lapResults.classList.add("hidden");
  count = 0;
  days = 0;
  hour = 0;
  minute = 0;
  second = 0;

  fixLeadingZero();

  daysEl.innerHTML = days + ":";
  hoursEl.innerHTML = hour + ":";
  minutesEl.innerHTML = minute + ":";
  secondsEl.innerHTML = second;

  let tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.innerHTML = "";
});

// Adds a lap to the table
lapButton.addEventListener("click", function () {
  lapResults.classList.remove("hidden");
  count++;
  fixLeadingZero();
  let tableBody = document.getElementsByTagName("tbody")[0];
  let row = tableBody.insertRow(0);
  let cell1 = row.insertCell(0); //Lap Count
  let cell2 = row.insertCell(1); //Time
  let cell3 = row.insertCell(2); //Total lap time
  cell1.innerHTML = count;
  cell2.innerHTML =
    (days > 1 ? days + ":" : "") + hour + ":" + minute + ":" + second;
});
