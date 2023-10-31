const timezoneSelect = document.getElementById("timezone-select");
const selectedTimezone = timezoneSelect.value;
const errorMsg = document.getElementById("error-msg");
const sameZoneError = document.getElementById("same-timezone-error");
const timezoneSpans = document.getElementsByClassName("timezone-name");
const popup = document.getElementById("timezone-popup");
const timezonePanel = document.getElementById("all-timezones");
const buttonContainer = document.getElementById("buttonContainer");
let toastBox = document.getElementById("toastbox");
const timezonePanelArray = [];
let currentTimeZone = [];
let localStorageTimezone = [];

// Toast Messages
let addedTimezoneMsg =
  "<i class='fa-solid fa-square-check'></i> Added timezone button";
let cantDeleteMsg =
  "<i class='fa-solid fa-square-xmark'></i> Can't delete, cause list has only one timezone.";
let deletedTimezoneMsg =
  "<i class='fa-solid fa-dumpster-fire'></i> Deleted the timezone";

// Toast Function
function showToast(activity) {
  let toast = document.createElement("div");
  toast.classList.add(
    "toast",
    "relative",
    "gap-2",
    "text-base",
    "font-normal",
    "flex",
    "items-center",
    "justify-center",
    "w-auto",
    "p-4",
    "text-white",
    "bg-white",
    "rounded-lg",
    "shadow-md",
    "my-2"
  );
  toast.innerHTML = activity;
  toastBox.appendChild(toast);

  if (activity.includes("Added")) {
    toast.classList.add("bg-green-600");
  }
  if (activity.includes("Can't delete")) {
    toast.classList.add("bg-red-800");
  }
  if (activity.includes("Deleted")) {
    toast.classList.add("bg-blue-500");
  }

  setTimeout(() => {
    toast.remove();
  }, 3000);
}

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

  // Store the timezone in localStorage
  localStorageTimezone.push(selectedTimezone);
  let convertedString = JSON.stringify(localStorageTimezone);
  localStorage.setItem("localStorageTimezone", convertedString);

  loadElementTime(timezoneButton);

  timezoneSelect.value = "";

  timezonePanelArray.forEach((button) => {
    button.addEventListener("click", function (event) {
      // To clear the interval for currentTime
      setTimeout(() => {
        clearInterval(currentTimeInterval), 1000;
      });
      clearInterval(currentTimeInterval);
      const targetBtn = event.currentTarget;
      loadElementTime(targetBtn);
    });

    timezonePanelArray.filter(Boolean).map(function (item) {
      return buttonContainer.appendChild(item);
    });
  });

  showToast(addedTimezoneMsg);
  closeTimezonePopup();
}

function loadElementTime(targetBtn) {
  const timezoneNameElement = targetBtn.querySelector(".timezone-name");
  if (timezoneNameElement) {
    setTimeout(() => {
      clearInterval(currentTimeInterval), 1000;
    });
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
document.getElementById("delete-btn").addEventListener("click", function () {
  const leftPanelTimezone = document.getElementById("timezone");
  if (timezonePanelArray.length > 1) {
    for (const span of timezoneSpans) {
      if (span.innerHTML === leftPanelTimezone.textContent) {
        const index = timezonePanelArray.findIndex(
          (button) => button.textContent === span.parentElement.textContent
        );
        if (index === 0) {
          timezonePanelArray[index + 1].classList.add("bg-amber-300");
          timezonePanelArray[index + 1].click();
        } else if (index > 0) {
          timezonePanelArray[index - 1].classList.add("bg-amber-300");
          timezonePanelArray[index - 1].click();
        }
        span.parentElement.remove();
        timezonePanelArray.splice(index, 1);

        showToast(deletedTimezoneMsg);

        // Update localStorage after deleting the timezone
        const selectedTimezone = span.innerHTML;
        const localStorageTimezone = JSON.parse(
          localStorage.getItem("localStorageTimezone")
        );
        const indexToDelete = localStorageTimezone.indexOf(selectedTimezone);
        if (indexToDelete > -1) {
          localStorageTimezone.splice(indexToDelete, 1);
          let convertedString = JSON.stringify(localStorageTimezone);
          localStorage.setItem("localStorageTimezone", convertedString);
        }
      }
    }
  } else {
    showToast(cantDeleteMsg);
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

// This function populates the timezone panel with localstorage data
function populateTimezonePanel(convertedArray) {
  convertedArray.forEach((timezone) => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: timezone,
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
      timezone +
      "</span>";
    timezonePanelArray.push(timezoneButton);

    timezonePanelArray.filter(Boolean).map(function (item) {
      return buttonContainer.appendChild(item);
    });

    timezonePanelArray.forEach((button) => {
      button.addEventListener("click", function (event) {
        // To clear the interval for currentTime
        setTimeout(() => {
          clearInterval(currentTimeInterval), 1000;
        });
        clearInterval(currentTimeInterval);
        const targetBtn = event.currentTarget;
        loadElementTime(targetBtn);
      });

      timezonePanelArray.filter(Boolean).map(function (item) {
        return buttonContainer.appendChild(item);
      });

      // const randomIndex = getRandomIndex();
      // timezonePanelArray[randomIndex].click();
      // function getRandomIndex() {
      //   return Math.floor(Math.random() * convertedArray.length);
      // }
    });
  });
}

// DOMContentLoaded event
window.addEventListener("DOMContentLoaded", function () {
  // To get the timezonePanelArray from localStorage and display it in the button container
  let fetchedString = localStorage.getItem("localStorageTimezone");
  let convertedArray = JSON.parse(fetchedString);
  if (convertedArray === null) {
    // To update user's current time on the main screen
    console.log("Nothing in the localstorage");
    userCurrentTime();
    makeCurrentTimeButton();
  } else {
    console.log("Timezone in the localstorage");
    populateTimezonePanel(convertedArray);
  }
});

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
    "class",
    "flex justify-between py-3 px-5 text-left tabular-nums border-b ease-in-out hover:bg-amber-300 block w-full bg-gray-100"
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
  $(".se-select2").select2();
});
