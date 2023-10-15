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
  // console.log(timezoneButton)
  timezoneSelect.value = "";
  sameZoneError.classList.add("hidden");
  // const buttons = timezonePanel.getElementsByClassName("tabular-nums");

  // Get a reference to the container where you want to display the buttons
  const buttonContainer = document.getElementById("buttonContainer");

  timezonePanelArray.forEach((button, index) => {
    button.addEventListener("click", function (event) {
      // You can access the clicked button using "this"
      // console.log(`Button ${index + 1} clicked!`);

      // // You can also access the event target to get the clicked button
      const clickedButton = event.target;
      console.log(`Button text: ${clickedButton.textContent}`);

      // Find the element with the "timezone-name" class inside the clickedButton
      const timezoneNameElement = clickedButton.querySelector(".timezone-name");
      if (timezoneNameElement) {
        currentTimeZone.splice(0, currentTimeZone.length);
        const selectedTimezoneContext = timezoneNameElement.textContent;
        currentTimeZone.push(selectedTimezoneContext);
        updateTime();
      }
    });
  });

  timezonePanelArray.map(function (item) {
    return buttonContainer.appendChild(item);
  });

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
// function getUpdatedValue(e) {
//   console.log("in function", e.target.value);
// }

function updateTime() {
  if (currentTimeZone.length > 0) {
    let innerCurrentTimeZonne = currentTimeZone[0];
    // console.log(innerCurrentTimeZonne);
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

  setTimeout(updateTime, 1000);
}
