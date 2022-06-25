let city = "Bangkok";
const apiKey = "a140ba932db1a5395f41c67b9e8c376b";

const form = document.getElementById("form");
const search = document.getElementById("search");

function setData() {
  showWeather();
}

async function showWeather() {
  try {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherResult = await fetch(weatherUrl).then((response) =>
      response.json()
    );
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "b0b54ac368msh866b698a9e6f64bp172fb3jsn63b40e6715d1",
        "X-RapidAPI-Host": "air-quality.p.rapidapi.com",
      },
    };
    const aqiUrl = `https://air-quality.p.rapidapi.com/current/airquality?lon=${weatherResult.coord.lon}&lat=${weatherResult.coord.lat}`;
    const aqiResult = await fetch(aqiUrl, options).then((response) =>
      response.json()
    );

    showDataUI(weatherResult, aqiResult);
  } catch (e) {
    console.log(error);
  }
}

function showDataUI(weatherData, aqiData) {
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const weather = document.getElementById("weather");
  const status = document.getElementById("status");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  const aqiElem = document.querySelector(".aqi > h1");
  const pm25 = document.getElementById("pm25");
  const pm10 = document.getElementById("pm10");

  city.innerText = weatherData.name;
  state.innerText = weatherData.sys.country;
  weather.children[0].innerText =
    calculate(parseInt(weatherData.main.temp)) + " °C";
  weather.children[1].innerText =
    "min :  " +
    calculate(parseInt(weatherData.main.temp_min)) +
    " °C" +
    "  |  max :  " +
    calculate(parseInt(weatherData.main.temp_min)) +
    " °C";
  status.innerText = weatherData.weather[0].main;
  humidity.innerText = "Humidity  " + weatherData.main.humidity;
  wind.innerText = "Wind  " + weatherData.wind.speed + "  km/h";

  aqiElem.innerText = aqiData.data[0].aqi;
  pm25.innerText = "pm2.5 =" + aqiData.data[0].pm25;
  pm10.innerText = "pm10 =" + aqiData.data[0].pm10;

  setAirQualityColor(aqiData.data[0].aqi);
}

function calculate(k) {
  return k - 273;
}

function callDataAPI(e) {
  e.preventDefault();
  city = search.value;
  showWeather();
}

function setAirQualityColor(aqi) {
  if (aqi <= 50) {
    document.documentElement.style.setProperty(
      "--current-aqi-color",
      "var(--good-aqi-color)"
    );
  } else if (aqi <= 100) {
    document.documentElement.style.setProperty(
      "--current-aqi-color",
      "var(--medium-aqi-color)"
    );
  } else {
    document.documentElement.style.setProperty(
      "--current-aqi-color",
      "var(--bad-aqi-color)"
    );
  }
}

form.addEventListener("submit", callDataAPI);

setData();
