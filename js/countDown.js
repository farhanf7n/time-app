const titleEL = document.querySelector(".countdown-title");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const millisecondsEl = document.querySelector(".milliseconds");
const secondsEl = document.querySelector(".seconds");
const addTimerBtn = document.querySelector(".edit-timer-btn");

// Edit Timer Popup's stuff
const minuteInput = document.getElementById("minute-input");
const hourInput = document.getElementById("hour-input");
const titleInput = document.getElementById("countdown-title-popup");
const donePopupButton = document.querySelector(".done-timer-btn");
const startBtn = document.querySelector(".start-timer-button");
const resetBtn = document.querySelector(".reset-timer-button");

const mainScreenTitle = document.querySelector(".main-screen-title");
const addTimerPopup = document.getElementById("add-countdown-popup");
const successTimerPopup = document.getElementById("success-countdown-popup");
const cancelButton = document.querySelector(".cancel-button");
const closeSuccess = document.querySelector(".close-success-popup-btn");
const testNotificationButton = document.getElementById("test-notification-btn");
const closeTimerpopup = document.getElementById("close-popup-btn");

let hour = 0;
let minute = 0;
let second = 0;
let milliseconds = 0;
let count = 0;
let intervalId;

// Fixes the leading zero issue
function fixLeadingZero() {
  milliseconds = milliseconds.toString().padStart(2, "0");
  second = second.toString().padStart(2, "0");
  minute = minute.toString().padStart(2, "0");
  hour = hour.toString().padStart(2, "0");
}

// Stopwatch functionality
function startTimerFn() {
  milliseconds++;
  if (milliseconds == 100) {
    second++;
    milliseconds = 0;
  }

  if (second == 60) {
    minute--;
    second = 0;
  }

  if (minute == 60) {
    hour--;
    minute = 0;
  }

  if (hour == 0 && minute == 0 && second == 0 && milliseconds == 0) {
    console.log("Done");
    clearInterval(intervalId);
    successTimerPopup.classList.remove("hidden");
  }

  fixLeadingZero();

  hoursEl.innerHTML = hour + ":";
  minutesEl.innerHTML = minute + ":";
  secondsEl.innerHTML = second + ":";
  millisecondsEl.innerHTML = milliseconds;
}

// Start timer button
startBtn.addEventListener("click", function () {
  intervalId = setInterval(startTimerFn, 10);
});

// Closes the popup
function closeTimezonePopup() {
  addTimerPopup.classList.add("hidden");
  successTimerPopup.classList.add("hidden");
  minuteInput.value = "";
  hourInput.value = "";
  titleInput.value = "";
  titleInput.value = "";
}

// Cancel Button
cancelButton.addEventListener("click", function () {
  closeTimezonePopup();
});

// Edit Timer Button
addTimerBtn.addEventListener("click", function () {
  addTimerPopup.classList.remove("hidden");
});

// Success Cross button
closeSuccess.addEventListener("click", function () {
  successTimerPopup.classList.add("hidden");
});

// Times Cross Button
closeTimerpopup.addEventListener("click", function () {
  closeTimezonePopup();
});

// Test Notification
testNotificationButton.addEventListener("click", function () {
  successTimerPopup.classList.remove("hidden");
});

// Done timer button
donePopupButton.addEventListener("click", function () {
  if (titleInput.value == "" && minuteInput.value == "") {
    return;
  }
  mainScreenTitle.textContent = titleInput.value;
  if (hourInput.value) {
    hoursEl.innerHTML = hourInput.value + ": ";
    hour = hourInput.value;
  } else {
    hoursEl.innerHTML = "00: ";
  }

  if (minuteInput.value) {
    minutesEl.innerHTML = minuteInput.value + ": ";
    minute = minuteInput.value;
  } else {
    minutesEl.innerHTML = "00: ";
  }

  closeTimezonePopup();
  startBtn.classList.remove("hidden");
});

// Reset timer button
resetBtn.addEventListener("click", function () {
  hoursEl.textContent = "00: ";
  minutesEl.textContent = "00: ";
  secondsEl.textContent = "00: ";
  millisecondsEl.textContent = "00";
  startBtn.classList.add("hidden");
  // Clear the interval
  clearInterval(intervalId);
});
