navigator.geolocation.getCurrentPosition(function getLocation(location) {
  const lat = location.coords.latitude.toFixed(3);
  const lon = location.coords.longitude.toFixed(3);
  getCity(lat, lon);
});

function getCity(lat, lon) {
  fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
  )
    .then((res) => res.json())
    .then((data) => {
      let cityName;
      if (data.address.city) {
        cityName = data.address.city;
      } else if (data.address.county) {
        cityName = data.address.county;
      } else if (data.address.state) {
        cityName = data.address.state;
      } else {
        cityName = data.address.country;
      }
      getWeather(cityName);
    })
    .catch((error) => {
      console.error("Error fetching city:", error);
    });
}

function getWeather(cityName) {
  fetch(`https://wttr.in/${cityName}?2Fnq`)
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("info").innerHTML = data;
    })
    .catch((error) => {
      document.getElementById("info").innerHTML =
        "500 Internal Server Error" + error;
    });
}
