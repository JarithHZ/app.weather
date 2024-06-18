const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");
const feelsElement = document.querySelector(".feels");
const temp_minElement = document.querySelector(".temp_min");
const temp_maxElement = document.querySelector(".temp_max");
const pressureElement = document.querySelector(".pressure");
const humidityElement = document.querySelector(".humidity");
const speedElement = document.querySelector(".speed");

const weather = {};
weather.temperature = {
    unit : "celsius"
}

const key =  "1cdc1dd720a3ab365da903d6be442104";

if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p> Browser doesn't support Geolocation</p>"
}


function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude, longitude);
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.messange} </p>`;
}

function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then(function (response) {
    let data = response.json();
    console.log(data);
    return data;
    })  
    .then(function (data) {
    weather.temperature.value = Math.floor(data.main.temp);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
    weather.feels = data.main.feels_like;
    weather.temp_min = data.main.temp_min;
    weather.temp_max = data.main.temp_max;
    weather.pressure = data.main.pressure;
    weather.humidity = data.main.humidity;
    weather.speed = data.wind.speed;

    })
    .then(function() {
    displayWeather();
    });
}

function displayWeather(){
    iconElement.innerHTML = `<img src="${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    feelsElement.innerHTML = `<p>Feels like: </p>${weather.feels}`;
    temp_minElement.innerHTML = `<p>Minimum temperature: </p>${weather.temp_min}`;
    temp_maxElement.innerHTML = `<p>Maximum temperature: </p>${weather.temp_max}`;
    pressureElement.innerHTML = `<p>Pressure: </p>${weather.pressure}`;
    humidityElement.innerHTML = `<p>Humidity: </p>${weather.humidity}`;
    speedElement.innerHTML = `<p>Speed: </p>${weather.speed}`;
}
