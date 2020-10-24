let now = new Date();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
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
  "December"
];

function formatHours(timestamp) {
  let time = new Date(timestamp);

  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

let h5 = document.querySelector("h5");
let date = now.getDate();
let year = now.getFullYear();
let day = days[now.getDay()];
let month = months[now.getMonth()];
h5.innerHTML = `${day} ${month} ${date}, ${formatHours(now)}`;

function showCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}

let locationForm = document.querySelector("#search-form");
locationForm.addEventListener("submit", showCity);

function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  let currentTemperature = Math.round(response.data.main.temp);
  let cTemp = `${currentTemperature}`;
  let h4 = document.querySelector("#temperature");
  h4.innerHTML = cTemp;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let currentHumidity = Math.round(response.data.main.humidity);
  let humidityD = `Humidity: ${currentHumidity}%`;
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = humidityD;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  let windspeedD = `Wind: ${currentWindSpeed} km/h`;
  let windSpeed = document.querySelector(".wind-speed");
  windSpeed.innerHTML = windspeedD;

  let cloudCover = Math.round(response.data.clouds.all);
  let description = `Cloudiness: ${cloudCover}%`;
  let weatherDescription = document.querySelector(".wDescription");
  weatherDescription.innerHTML = description;

  document.querySelector("#descrip").innerHTML = response.data.weather[0].main;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
for (let index = 0; index < 6; index ++){
	let forecast = response.data.list[index];
  forecastElement.innerHTML += `
	<div class="col-2">
			  <h3>
			  ${formatHours(forecast.dt * 1000)}
			  </h3>
		<img 
		src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
		
		/>
		<div class="weather-forecast-temperature">
			<strong>
			${Math.round(forecast.main.temp_max)}°
			</strong>
			${Math.round(forecast.main.temp_min)}°
		</div>
		</div>
		`;
	}
}
  
function searchCity(city) {
  let units = "metric";
  let apiKey = "eeb8f7e85a1864933f31f435c249cf5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  
}

function searchLocation(position) {
  let apiKey = `eeb8f7e85a1864933f31f435c249cf5b`;
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displaycelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);