const timezoneSelect = document.getElementById("timezone-select");
const selectedTimezone = timezoneSelect.value;
const errorMsg = document.getElementById("error-msg");


function loadTimezones() {
  const timezoneSelect = document.getElementById("timezone-select");
  if (timezoneSelect.options.length > 1) {
    return;
  }

  for (const timeZone of Intl.supportedValuesOf("timeZone")) {
    timezoneSelect.options.add(new Option(timeZone));
  }
}

function showTimezonePopup() {
  const popup = document.getElementById("timezone-popup");
  popup.classList.remove("hidden");
}

function closeTimezonePopup() {
  const popup = document.getElementById("timezone-popup");
  popup.classList.add("hidden");
  timezoneSelect.value = "";
  errorMsg.classList.add("hidden");
}

function addSelectedTimezone() {
  const timezoneSelect = document.getElementById("timezone-select");
  const selectedTimezone = timezoneSelect.value;

  if (!selectedTimezone) {
    errorMsg.classList.remove("hidden");
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
    '</span> <span class="text-gray-400">' +
    selectedTimezone +
    "</span>";
  const timezonePanel = document.getElementById("all-timezones");
  timezonePanel.prepend(timezoneButton);

  timezoneSelect.value = "";
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
    closeTimezonePopup();
  });


document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeTimezonePopup();
  }
});
