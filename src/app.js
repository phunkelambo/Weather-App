function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class = "row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class = "col-2">
          <div class = "five-day-forecast">${getForecastDay(
            forecastDay.dt
          )}</div>
            <img src = "https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt = "forecast-icon" width = "40"/>
            <div class = " forecast-description">${
              forecastDay.weather[0].description
            }</div>
            <div class = "forecast-temperatures">
              <span class = "forecast-max-temp">${Math.round(
                forecastDay.temp.max
              )}°C</span>
              <span class = "forecast-min-temp">${Math.round(
                forecastDay.temp.min
              )}°C</span>
            </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8678fe46de622085a6470ee25e2466ff";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  ttps: getForecast(response.data.coord);
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
displayForecast();
