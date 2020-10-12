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
  "December",
];

let h5 = document.querySelector("h5");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let day = days[now.getDay()];
let month = months[now.getMonth()];

h5.innerHTML = `${day} ${month} ${date}, ${year} ${hours}:${minutes}`;

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

  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
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

 
}

function searchCity(city) {
  let units = "metric";
  let apiKey = "eeb8f7e85a1864933f31f435c249cf5b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
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

function displayFahrenheitTemperature(event){
	event.preventDefault();
	let temperatureElement=document.querySelector("#temperature");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML= Math.round(fahrenheitTemperature);

}

function displaycelsiusTemperature(event){
	event.preventDefault();
	let temperatureElement=document.querySelector("#temperature");
	temperatureElement.innerHTML= Math.round(celsiusTemperature);

}

let celsiusTemperature = null;


let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsiusTemperature);
