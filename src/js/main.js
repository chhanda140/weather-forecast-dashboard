let selectedCityFromDropdown = "";

import {
  fetchWeatherByCity,
  fetchWeatherByCoords
} from "./api.js";

import {
  renderCurrentWeather,
  updateTemperature
} from "./ui.js";

import {
  saveCity,
  getRecentCities
} from "./storage.js";

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
   SEARCH BY CITY
======================= */
searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim() || selectedCityFromDropdown;

  if (!city) {
    showError("Please enter a city name");
    return;
  }

  try {
    errorMessage.classList.add("hidden");

    const currentWeather = await fetchWeatherByCity(city);
    renderCurrentWeather(currentWeather);

    // ✅ Save CLEAN city name from API
    saveCity(currentWeather.name);
    updateRecentCities();

  } catch (error) {
    showError(error.message);
  }
});

/* =======================
   CURRENT LOCATION
======================= */
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

/* =======================
   TEMPERATURE TOGGLE
======================= */
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

/* =======================
   RECENT CITIES DROPDOWN
======================= */
function updateRecentCities() {
  const cities = getRecentCities();

  // 🔍 DEBUG LINE (TEMPORARY)
  console.log("Recent cities:", cities);

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


recentCitiesDropdown.addEventListener("change", (e) => {
  const city = e.target.value;
  if (!city) return;

  selectedCityFromDropdown = city;
  cityInput.value = city; // show it in input for clarity
});



/* =======================
   ERROR HANDLER
======================= */
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

/* =======================
   INIT ON PAGE LOAD
======================= */
document.addEventListener("DOMContentLoaded", () => {
  updateRecentCities();
});
