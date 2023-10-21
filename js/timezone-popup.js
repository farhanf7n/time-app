const timezoneSelect = document.getElementById("timezone-select");
const selectedTimezone = timezoneSelect.value;
const errorMsg = document.getElementById("error-msg");
const sameZoneError = document.getElementById("same-timezone-error");
const timezoneSpans = document.getElementsByClassName("timezone-name");
const popup = document.getElementById("timezone-popup");
const timezonePanel = document.getElementById("all-timezones");
const timezonePanelArray = [];
let currentTimeZone = [];

function loadTimezones() {
  if (timezoneSelect.options.length > 1) {
    return;
  }

  for (const timeZone of Intl.supportedValuesOf("timeZone")) {
    timezoneSelect.options.add(new Option(timeZone));
  }
}

function showTimezonePopup() {
  popup.classList.remove("hidden");
}

function closeTimezonePopup() {
  popup.classList.add("hidden");
  timezoneSelect.value = "";
  errorMsg.classList.add("hidden");
}

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
  });

  const timezoneButton = document.createElement("button");
  timezoneButton.setAttribute(
    "class",
    "flex justify-between py-3 px-5 text-left tabular-nums border-b hover:bg-gray-100 block w-full bg-gray-100"
  );
  timezoneButton.innerHTML =
    '<span class="font-semibold">' +
    currentTime +
    '</span> <span class="text-gray-400 timezone-name">' +
    selectedTimezone +
    "</span>";

  timezonePanelArray.push(timezoneButton);
  timezoneSelect.value = "";
  sameZoneError.classList.add("hidden");

  // Get a reference to the container where you want to display the buttons
  const buttonContainer = document.getElementById("buttonContainer");
  timezonePanelArray.forEach((button) => {
    button.addEventListener("click", function (event) {
      // To clear the interval for currentTime
      setTimeout(() => { clearInterval(currentTimeInterval), 1000 });
      clearInterval(currentTimeInterval);
      const targetBtn = event.currentTarget;
      const timezoneNameElement = targetBtn.querySelector(".timezone-name");
      if (timezoneNameElement) {
        currentTimeZone.splice(0, currentTimeZone.length);
        const selectedTimezoneContext = timezoneNameElement.textContent;
        currentTimeZone.push(selectedTimezoneContext);
        updateTime();
      }
      // Add bg-amber-300 class to clicked button
      targetBtn.classList.add("bg-amber-300");

      // Remove bg-amber-300 class from other buttons
      timezonePanelArray.forEach((otherButton) => {
        if (otherButton !== targetBtn) {
          otherButton.classList.remove("bg-amber-300");
        }
      });
    });


    timezonePanelArray.filter(Boolean).map(function (item) {
      return buttonContainer.appendChild(item);
    });
  });

  // timezonePanelArray.map(function (item) {
  //   return buttonContainer.appendChild(item);
  // });
  closeTimezonePopup();
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

// Pop-ups add timezone button
document
  .getElementById("add-timezone-popup-btn")
  .addEventListener("click", function () {
    addSelectedTimezone();
  });

// Checks if the user pressed Esc key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTimezonePopup();
  }
});

// This function update the time in main section
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

window.addEventListener("DOMContentLoaded", function () {
  if (timezonePanelArray.length === 0) {
    // To update time on the main screen
    userCurrentTime();
  }
})

function userCurrentTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date();
  const time = date.toLocaleTimeString();

  document.getElementById("timezone").textContent = timezone;
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date.toDateString();
}
const currentTimeInterval = setInterval(userCurrentTime, 1000);

// timezonePanelArray.forEach((button) => {
//   button.addEventListener("click", function () {
//     console.log("Waiting");
//     setTimeout(() => { clearInterval(currentTimeInterval), 1000 });
//     console.log("Done.")
//     // clearInterval(currentTimeInterval);
//   })
// })


$(document).ready(function () {
  $('.se-select2').select2();
});