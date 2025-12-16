import {
  fetchWeatherByCity,
  fetchWeatherByCoords,
  fetchFiveDayForecast
} from "./api.js";

import {
  renderCurrentWeather,
  updateTemperature,
  renderFiveDayForecast
} from "./ui.js";

/* =======================
   DOM ELEMENTS
======================= */
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");

const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

/* =======================
   SEARCH BY CITY
======================= */
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    errorMessage.classList.add("hidden");

    // Current weather
    const weather = await fetchWeatherByCity(city);
    renderCurrentWeather(weather);

    // 5-day forecast
    const forecastData = await fetchFiveDayForecast(city);
    renderFiveDayForecast(forecastData);

  } catch (error) {
    showError(error.message);
  }
});

/* =======================
   CURRENT LOCATION
======================= */
locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Geolocation not supported");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      try {
        errorMessage.classList.add("hidden");

        const { latitude, longitude } = position.coords;
        const weather = await fetchWeatherByCoords(latitude, longitude);
        renderCurrentWeather(weather);

      } catch (error) {
        showError(error.message);
      }
    },
    () => showError("Location permission denied")
  );
});

/* =======================
   TEMPERATURE TOGGLE
======================= */
celsiusBtn.addEventListener("click", () => updateTemperature("C"));
fahrenheitBtn.addEventListener("click", () => updateTemperature("F"));

/* =======================
   ERROR HANDLER
======================= */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
