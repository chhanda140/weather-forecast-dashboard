import { fetchWeatherByCity } from "./api.js";
import {
  renderCurrentWeather,
  updateTemperature
} from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");

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
