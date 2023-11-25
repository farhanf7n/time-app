const titleEL = document.querySelector(".countdown-title");
const daysEl = document.querySelector(".days");
const hoursEl = document.querySelector(".hours");
const minutesEl = document.querySelector(".minutes");
const millisecondsEl = document.querySelector(".milliseconds");
const secondsEl = document.querySelector(".seconds");
const addTimerBtn = document.querySelector(".edit-timer-btn");
const minuteInput = document.getElementById("minute-input");
const hourInput = document.getElementById("hour-input");
const notificationCheckbox = document.getElementById("notification-checkbox");
const countdownTitle = document.getElementById("countdown-title");
const addTimerPopup = document.getElementById("add-countdown-popup");
const successTimerPopup = document.getElementById("success-countdown-popup");
const cancelButton = document.querySelector(".cancel-button");
const closeSuccess = document.querySelector(".close-success-popup-btn");
const testNotificationButton = document.getElementById("test-notification-btn");
const closeTimerpopup = document.getElementById("close-popup-btn");

// Closes the popup
function closeTimezonePopup() {
  addTimerPopup.classList.add("hidden");
  successTimerPopup.classList.add("hidden");
  minuteInput.value = "";
  hourInput.value = "";
  notificationCheckbox.checked = false;
  countdownTitle.value = "";
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
  closeTimezonePopup();
});

// Times Cross Button
closeTimerpopup.addEventListener("click", function () {
  closeTimezonePopup();
});

// Test Notification
testNotificationButton.addEventListener("click", function () {
  successTimerPopup.classList.remove("hidden");
});
