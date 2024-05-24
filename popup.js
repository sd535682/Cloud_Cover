document.addEventListener("DOMContentLoaded", () => {
  navigator.geolocation.getCurrentPosition(
    ({ coords: { latitude, longitude } }) => {
      fetch(`https://wttr.in/${latitude},${longitude}?2Fn`)
        .then((response) => response.text())
        .then((data) => {
          document.getElementById("info").innerHTML = data;
        })
        .catch((error) => {
          document.getElementById("info").innerHTML = `Got an error: ${error}`;
        });
    }
  );
});
