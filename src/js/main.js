import { fetchWeatherByCity, fetchForecastByCity } from "./api.js";
import { renderCurrentWeather } from "./ui.js";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const errorMessage = document.getElementById("errorMessage");

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

function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}
