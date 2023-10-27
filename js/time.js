const timezoneSelect = document.getElementById("timezone-select");
const selectedTimezone = timezoneSelect.value;
const errorMsg = document.getElementById("error-msg");
const sameZoneError = document.getElementById("same-timezone-error");
const timezoneSpans = document.getElementsByClassName("timezone-name");
const popup = document.getElementById("timezone-popup");
const timezonePanel = document.getElementById("all-timezones");
const buttonContainer = document.getElementById("buttonContainer");
const timezonePanelArray = [];
let currentTimeZone = [];

// Loads all the timezones in the select dropdown
function loadTimezones() {
  if (timezoneSelect.options.length > 1) {
    return;
  }
  for (const timeZone of Intl.supportedValuesOf("timeZone")) {
    timezoneSelect.options.add(new Option(timeZone));
  }
}

// Shows the popup
function showTimezonePopup() {
  popup.classList.remove("hidden");
}

// Closes the popup
function closeTimezonePopup() {
  popup.classList.add("hidden");
  timezoneSelect.value = "";
  errorMsg.classList.add("hidden");
}

// Adds selected timezone to the right button container
function addSelectedTimezone() {
  const selectedTimezone = timezoneSelect.value;
  
  if (!selectedTimezone) {
    errorMsg.classList.remove("hidden");
    return;
  }

  let timezoneExists = false;
  for (const span of timezoneSpans) {
    if (span.innerHTML === selectedTimezone) {
      timezoneExists = true;
      break; // exit the loop if a matching timezone span is found
    }
  }

  if (timezoneExists) {
    sameZoneError.classList.remove("hidden");
    return;
  }

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: selectedTimezone,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const timezoneButton = document.createElement("button");
  timezoneButton.setAttribute(
    "class",
    "flex justify-between py-3 px-5 text-left tabular-nums border-b ease-in-out hover:bg-amber-300 block w-full bg-gray-100"
  );
  timezoneButton.innerHTML =
    '<span class="font-semibold">' +
    currentTime +
    '</span> <span class="text-gray-500 timezone-name">' +
    selectedTimezone +
    "</span>";
  timezonePanelArray.push(timezoneButton);
  sameZoneError.classList.add("hidden");

  // Start running the clock in the main section after adding the selected timezone
  // setTimeout(() => { clearInterval(currentTimeInterval), 1000 });
  // clearInterval(currentTimeInterval);

  // currentTimeZone.splice(0, currentTimeZone.length);
  // currentTimeZone.push(selectedTimezone);
  // updateTime();

  loadElementTime(timezoneButton);


  timezoneSelect.value = "";


  timezonePanelArray.forEach((button) => {
    button.addEventListener("click", function (event) {
      // To clear the interval for currentTime
      setTimeout(() => { clearInterval(currentTimeInterval), 1000 });
      clearInterval(currentTimeInterval);
      const targetBtn = event.currentTarget;
      loadElementTime(targetBtn);
    });

    timezonePanelArray.filter(Boolean).map(function (item) {
      return buttonContainer.appendChild(item);
    });
    // To store the timezonePanelArray in localStorage
  });

  console.log(timezonePanelArray);
  closeTimezonePopup();
}

function loadElementTime(targetBtn) {
  const timezoneNameElement = targetBtn.querySelector(".timezone-name");
  if (timezoneNameElement) {
    setTimeout(() => { clearInterval(currentTimeInterval), 1000 });
    clearInterval(currentTimeInterval);

    currentTimeZone.splice(0, currentTimeZone.length);
    const selectedTimezoneContext = timezoneNameElement.textContent;
    currentTimeZone.push(selectedTimezoneContext);
    updateTime();

    // Add bg-amber-300 class to clicked button
    targetBtn.classList.add("bg-amber-300");

    // Remove bg-amber-300 class from other buttons
    timezonePanelArray.forEach((otherButton) => {
      if (otherButton !== targetBtn) {
        otherButton.classList.remove("bg-amber-300");
      }
    });
  }
}

// Add timezone button in the right panel
document
  .getElementById("add-timezone-btn")
  .addEventListener("click", function () {
    showTimezonePopup();
    loadTimezones();
  });

// Cross button for popup
document
  .getElementById("close-popup-btn")
  .addEventListener("click", function () {
    closeTimezonePopup();
  });

// add timezone button of Pop-up
document
  .getElementById("add-timezone-popup-btn")
  .addEventListener("click", function () {
    addSelectedTimezone();
  });

// Delete button functionality
document
  .getElementById("delete-btn")
  .addEventListener("click", function () {
    const leftPanelTimezone = document.getElementById("timezone");
    for (const span of timezoneSpans) {
      if (span.innerHTML === leftPanelTimezone.textContent) {
        const index = timezonePanelArray.findIndex(
          (button) => button.textContent === span.parentElement.textContent
        );
        if (index === 0) {
          timezonePanelArray[index].classList.add("bg-amber-300");
          timezonePanelArray[index].click();
        } else if (index > 0) {
          span.parentElement.remove();
          timezonePanelArray.splice(index, 1);
          timezonePanelArray[index - 1].classList.add("bg-amber-300");
          timezonePanelArray[index - 1].click();
        }

      }
    }
  });

// Checks if the user pressed Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTimezonePopup();
  }
});

// This function update time in main section
function updateTime() {
  if (currentTimeZone.length > 0) {
    let innerCurrentTimeZonne = currentTimeZone[0];

    const date = new Date().toLocaleDateString("en-US", {
      timeZone: innerCurrentTimeZonne,
    });
    const time = new Date().toLocaleTimeString("en-US", {
      timeZone: innerCurrentTimeZonne,
      hour12: false,
    });

    document.getElementById("timezone").textContent = innerCurrentTimeZonne;
    document.getElementById("time").textContent = time;

    const formattedDate = new Date(date);
    const formattedDateString = formattedDate.toDateString();
    document.getElementById("date").textContent = formattedDateString;
  }

  setInterval(updateTime, 1000);
}

// DOMContentLoaded event
window.addEventListener("DOMContentLoaded", function () {
  // To store timezonePanelArray in localStorage
  // Store the timezonePanelArray in localStorage and then when the page is refreshed, load the timezonePanelArray from localStorage

  if (timezonePanelArray.length === 0) {
    // To update user's current time on the main screen
    userCurrentTime();
    makeCurrentTimeButton();
  }
})

// To update user's current time on the main screen
function userCurrentTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date();
  const time = date.toLocaleTimeString();

  document.getElementById("timezone").textContent = timezone;
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date.toDateString();
}
const currentTimeInterval = setInterval(userCurrentTime, 1000);

// make button in the button container panel
function makeCurrentTimeButton() {
  const timezoneName = document.getElementById("timezone").textContent;

  const currentTime = new Date().toLocaleString("en-US", {
    timeZone: timezoneName,
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });

  const timezoneButton = document.createElement("button");
  timezoneButton.setAttribute(
    "class", "flex justify-between py-3 px-5 text-left tabular-nums border-b ease-in-out hover:bg-amber-300 block w-full bg-gray-100"
  );
  timezoneButton.innerHTML =
    '<span class="font-semibold">' +
    currentTime +
    '</span> <span class="text-gray-500 timezone-name">' +
    timezoneName +
    "</span>";

  timezonePanelArray.push(timezoneButton);

  timezonePanelArray.filter(Boolean).map(function (item) {
    return buttonContainer.appendChild(item);
  });
}

$(document).ready(function () {
  $('.se-select2').select2();
});