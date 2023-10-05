// To update time on the main screen
function updateTime() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const date = new Date();
  const time = date.toLocaleTimeString();

  document.getElementById("timezone").textContent = timezone;
  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date.toDateString();
}

// Update the time every second
setInterval(updateTime, 1000);
