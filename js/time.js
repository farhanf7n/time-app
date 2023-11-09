const timezoneSelect = document.getElementById("timezone-select");
const errorMsg = document.getElementById("error-msg");
const sameZoneError = document.getElementById("same-timezone-error");
const popup = document.getElementById("timezone-popup");
const buttonContainer = document.getElementById("buttonContainer");
let toastBox = document.getElementById("toastbox");

let currentTimeZone = null;
// ------------------------------------------
// Load current timezones from localstorage
// ------------------------------------------
let storedTimezoneListStr = localStorage.getItem("timezones_list");
let currentTimezones = JSON.parse(storedTimezoneListStr) || [];
let clickedTimezoneStr = localStorage.getItem("clicked_timezone");
const timezoneToSelect = JSON.parse(clickedTimezoneStr) || null;

if (currentTimezones.length === 0) {
  // To update user's current time on the main screen
  currentTimezones.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
  currentTimeZone = currentTimezones[0];
}

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
    "someToastAnimation",
    "sm-text-base",
    "relative",
    "gap-2",
    "text-sm",
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
  $("#timezone-select").val(null).trigger("change");
  errorMsg.classList.add("hidden");
  sameZoneError.classList.add("hidden");
}

// Adds selected timezone to the right button container
function addSelectedTimezone() {
  const selectedTimezone = timezoneSelect.value;
  localStorage.setItem("clicked_timezone", JSON.stringify(selectedTimezone));

  if (!selectedTimezone) {
    errorMsg.classList.remove("hidden");
    return;
  }

  const timezoneSpans = document.getElementsByClassName("timezone-name");
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

  sameZoneError.classList.add("hidden");

  $("#timezone-select").val(null).trigger("change");

  showToast(addedTimezoneMsg);
  closeTimezonePopup();

  // Add the new timezone to timezones array and populate the timezone panel
  currentTimezones.push(selectedTimezone);
  populateTimezonePanel(currentTimezones);
}

function loadElementTime(targetBtn) {
  const previouslySelectedTimezone =
    document.querySelector(".current-timezone");
  if (previouslySelectedTimezone) {
    previouslySelectedTimezone.classList.remove("current-timezone");
  }

  const timezoneNameElement = targetBtn.querySelector(".timezone-name");
  currentTimeZone = timezoneNameElement.textContent;
  loadCurrentTimezoneTime();

  targetBtn.classList.add("current-timezone");
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
  const activeTimezoneEl = document.getElementById("timezone");
  if (currentTimezones.length === 1) {
    showToast(cantDeleteMsg);
    return;
  }

  const activeTimezoneName = activeTimezoneEl.textContent;
  const indexToDelete = currentTimezones.indexOf(activeTimezoneName);
  currentTimezones.splice(indexToDelete, 1);
  const setLastToLocal = currentTimezones[currentTimezones.length - 1];
  localStorage.setItem("clicked_timezone", JSON.stringify(setLastToLocal));
  populateTimezonePanel(currentTimezones);
  showToast(deletedTimezoneMsg);
});

// Checks if the user pressed Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTimezonePopup();
  }
});

// This function update time in main section
function loadCurrentTimezoneTime() {
  if (!currentTimeZone) {
    return;
  }

  let innerCurrentTimeZone = currentTimeZone;

  const date = new Date().toLocaleDateString("en-US", {
    timeZone: innerCurrentTimeZone,
  });

  const time = new Date().toLocaleTimeString("en-US", {
    timeZone: innerCurrentTimeZone,
    hour12: false,
  });

  document.getElementById("timezone").textContent = innerCurrentTimeZone;
  document.getElementById("time").textContent = time;

  const formattedDate = new Date(date);
  document.getElementById("date").textContent = formattedDate.toDateString();

  setInterval(loadCurrentTimezoneTime, 1000);
}

// This function populates the timezone panel with localstorage data
function populateTimezonePanel(timezonesList, timezoneToSelect) {
  // Remove all the existing timezones
  buttonContainer.innerHTML = "";

  let lastTimezoneButton = null;

  timezonesList.forEach((timezone) => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: timezone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const timezoneButton = document.createElement("button");
    timezoneButton.setAttribute(
      "class",
      "flex justify-between py-3 px-5 text-left tabular-nums border-b ease-in-out hover:bg-gray-300 block w-full bg-gray-100"
    );

    timezoneButton.innerHTML =
      '<span class="font-semibold">' +
      currentTime +
      '</span> <span class="text-gray-500 timezone-name">' +
      timezone +
      "</span>";

    buttonContainer.appendChild(timezoneButton);

    timezoneButton.addEventListener("click", function (event) {
      const targetBtn = event.currentTarget;
      loadElementTime(targetBtn);
      localStorage.setItem("clicked_timezone", JSON.stringify(timezone));
    });
    lastTimezoneButton = timezoneButton;
  });

  if (!timezoneToSelect) {
    lastTimezoneButton.classList.add("current-timezone");
    currentTimeZone = timezonesList[timezonesList.length - 1];
  } else {
    findButtonWithSameTimezone();
    currentTimeZone = timezoneToSelect;
  }

  loadCurrentTimezoneTime();

  localStorage.setItem("timezones_list", JSON.stringify(timezonesList));
}

// DOMContentLoaded event
window.addEventListener("DOMContentLoaded", function () {
  populateTimezonePanel(currentTimezones, timezoneToSelect);
});

$(document).ready(function () {
  $(".se-select2").select2();
});

// This function finds the button with the same timezone as the selected timezone
function findButtonWithSameTimezone() {
  var buttons = document.querySelectorAll("#buttonContainer button");

  buttons.forEach(function (button) {
    var span = button.querySelector(".timezone-name");
    if (span.textContent.trim() === timezoneToSelect) {
      button.classList.add("current-timezone");
    }
  });
}
