const timezoneSelect = document.getElementById("timezone-select");
const selectedTimezone = timezoneSelect.value;
const errorMsg = document.getElementById("error-msg");
const sameZoneError = document.getElementById("same-timezone-error");
const timezoneSpans = document.getElementsByClassName("timezone-name");
const popup = document.getElementById("timezone-popup");
const timezonePanel = document.getElementById("all-timezones");

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
  timezonePanel.prepend(timezoneButton);
  timezoneSelect.value = "";
  sameZoneError.classList.add("hidden");
  const buttons = timezonePanel.getElementsByTagName("button");


  for (const button of buttons) {
    button.addEventListener("click", function () {
      button.classList.add("bg-amber-300");
      function updateTime() {
        const timezoneElements = button.getElementsByClassName("timezone-name");
        // Check if there is at least one element with the class "timezone-name"
        if (timezoneElements.length > 0) {
          const timezone = timezoneElements[0].innerHTML;
          // get the current time and date in the selected timezone
          const date = new Date().toLocaleDateString("en-US", { timeZone: timezone });
          const time = new Date().toLocaleTimeString("en-US", { timeZone: timezone, hour12: false });
          document.getElementById("timezone").textContent = timezone;
          document.getElementById("time").textContent = time;
          // Convert the formatted date string to a Date object
          const formattedDate = new Date(date);
          // Format the date in the desired format
          const formattedDateString = formattedDate.toDateString();
          document.getElementById("date").textContent = formattedDateString;
        }
      }
      setInterval(updateTime, 1000);
      button.classList.remove("bg-amber-300");
    });
  }
  closeTimezonePopup();
}

document
  .getElementById("add-timezone-btn")
  .addEventListener("click", function () {
    showTimezonePopup();
    loadTimezones();
  });

document
  .getElementById("close-popup-btn")
  .addEventListener("click", function () {
    closeTimezonePopup();
  });

document
  .getElementById("add-timezone-popup-btn")
  .addEventListener("click", function () {
    addSelectedTimezone();
  });


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTimezonePopup();
  }
});
