function showCurrentDate(latestDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let day = days[latestDate.getDay()];
  let month = months[latestDate.getMonth()];
  let date = latestDate.getDate();
  let year = latestDate.getFullYear();
  let hours = latestDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = latestDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateToday = document.querySelector("#current-date-time");
  dateToday.innerHTML = `${day}, ${date} ${month} ${year}<br />${hours}:${minutes}`;
  return dateToday;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
                    <div class="col-2">
                <div style="min-height: 0px">
                  <div
                    class="collapse collapse-horizontal"
                    id="weatherForecast"
                  >
                    <div class="card card-body text-center weather-forecast-box" style="width: 100%" id="forecast">
                      <div class="weather-forecast-date">${formatDay(
                        forecastDay.dt
                      )}</div>
                      <div class="weather-icon">
                      ${forecastWeatherIcon(forecastDay.weather[0].description)}
                      </div>
                      <div class="weather-forecast-temperature" style="font-size: 14px">
                        <span class="weather-forecast-temperature-max"
                          >${Math.round(forecastDay.temp.max)}°/</span
                        >
                        <span class="weather-forecast-temperature-min"
                          >${Math.round(forecastDay.temp.min)}°</span
                        >
                      </div>
                      <div>
                        <br />
                        <i class="bi bi-umbrella"></i>
                        <span style="font-size: 14px">${Math.round(
                          forecastDay.pop * 100
                        )}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    document.querySelector("#rain-probability").innerHTML = Math.round(
      forecastDay.pop * 100
    );
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  console.log(response);

  let temperatureElement = document.querySelector("#temperature");
  let cityInputElement = document.querySelector("#cityName");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  let currentElement = document.querySelector("#temp");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  currentElement.innerHTML = Math.round(response.data.main.feels_like);
  cityInputElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();

  let cityInputElement = document.querySelector("#searchInput").value;
  search(cityInputElement);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#tempf");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#tempc");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Toronto");
