import { fetchWeatherByCity, fetchWeatherByCoords } from "./api.js";
import { renderCurrentWeather, updateTemperature } from "./ui.js";
import { saveCity, getRecentCities } from "./storage.js";
import { fetchFiveDayForecast } from "./api.js";
import { renderFiveDayForecast } from "./ui.js";


/* =======================
   DOM ELEMENTS
======================= */
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");

const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

const recentCitiesDropdown = document.getElementById("recentCities");

/* =======================
   SEARCH BY CITY (INPUT)
======================= */
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    errorMessage.classList.add("hidden");

    const weather = await fetchWeatherByCity(city);
    renderCurrentWeather(weather);

    const forecastData = await fetchFiveDayForecast(city);
    renderFiveDayForecast(forecastData);


    saveCity(weather.name);
    updateRecentCities();
  } catch (error) {
    showError(error.message);
  }
});

/* =======================
   DROPDOWN SELECTION
======================= */
recentCitiesDropdown.addEventListener("change", async (e) => {
  const city = e.target.value;
  if (!city) return;

  try {
    errorMessage.classList.add("hidden");

    const weather = await fetchWeatherByCity(city);
    renderCurrentWeather(weather);
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
    async (pos) => {
      try {
        errorMessage.classList.add("hidden");
        const { latitude, longitude } = pos.coords;
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
   TEMP TOGGLE
======================= */
celsiusBtn.addEventListener("click", () => updateTemperature("C"));
fahrenheitBtn.addEventListener("click", () => updateTemperature("F"));

/* =======================
   RECENT CITIES
======================= */
function updateRecentCities() {
  const cities = getRecentCities();

  recentCitiesDropdown.innerHTML =
    `<option value="">Recently searched cities</option>`;

  if (cities.length === 0) {
    recentCitiesDropdown.classList.add("hidden");
    return;
  }

  cities.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    recentCitiesDropdown.appendChild(option);
  });

  recentCitiesDropdown.classList.remove("hidden");
}

/* =======================
   ERROR
======================= */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

/* =======================
   INIT
======================= */
document.addEventListener("DOMContentLoaded", updateRecentCities);
