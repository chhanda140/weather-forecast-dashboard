import {
  fetchWeatherByCity,
  fetchWeatherByCoords
} from "./api.js";

import {
  renderCurrentWeather,
  updateTemperature
} from "./ui.js";

import { saveCity, getRecentCities } from "./storage.js";


const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");
const recentCitiesDropdown = document.getElementById("recentCities");


const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    errorMessage.classList.add("hidden");
    const currentWeather = await fetchWeatherByCity(city);
    renderCurrentWeather(currentWeather);
  } catch (error) {
    showError(error.message);
  }
    saveCity(city);
    updateRecentCities();
});


const locationBtn = document.getElementById("locationBtn");

locationBtn.addEventListener("click", () => {
  if (!navigator.geolocation) {
    showError("Geolocation is not supported by your browser");
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
    () => {
      showError("Location permission denied");
    }
  );
});


celsiusBtn.addEventListener("click", () => {
  updateTemperature("C");
  celsiusBtn.classList.add("bg-blue-600", "text-white");
  fahrenheitBtn.classList.remove("bg-blue-600", "text-white");
});

fahrenheitBtn.addEventListener("click", () => {
  updateTemperature("F");
  fahrenheitBtn.classList.add("bg-blue-600", "text-white");
  celsiusBtn.classList.remove("bg-blue-600", "text-white");
});

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

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

recentCitiesDropdown.addEventListener("change", async () => {
  const city = recentCitiesDropdown.value;
  if (!city) return;

  try {
    const weather = await fetchWeatherByCity(city);
    renderCurrentWeather(weather);
  } catch (error) {
    showError(error.message);
  }
});
