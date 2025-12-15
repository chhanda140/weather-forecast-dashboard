let currentTempCelsius = null;

export function renderCurrentWeather(data) {
  const container = document.getElementById("weatherContent");
  const section = document.getElementById("currentWeather");

  currentTempCelsius = Math.round(data.main.temp);

  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const condition = data.weather[0].main.toLowerCase();
  const city = data.name;

  container.innerHTML = buildWeatherHTML(
    city,
    currentTempCelsius,
    "C",
    humidity,
    wind,
    condition
  );

  section.classList.remove("hidden");
  updateBackground(condition);
}

export function updateTemperature(unit) {
  if (currentTempCelsius === null) return;

  const temp =
    unit === "F"
      ? Math.round((currentTempCelsius * 9) / 5 + 32)
      : currentTempCelsius;

  const container = document.getElementById("weatherContent");
  const city = document.querySelector("#weatherContent h2").textContent;
  const humidity = document.querySelector("#humidity").dataset.value;
  const wind = document.querySelector("#wind").dataset.value;
  const condition = document.querySelector("#condition").dataset.value;

  container.innerHTML = buildWeatherHTML(
    city,
    temp,
    unit,
    humidity,
    wind,
    condition
  );
}

function buildWeatherHTML(city, temp, unit, humidity, wind, condition) {
  return `
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">${city}</h2>
      <p class="text-3xl font-bold mb-2">${temp}°${unit}</p>
      <p id="condition" data-value="${condition}" class="capitalize mb-1">
        Condition: ${condition}
      </p>
      <p id="humidity" data-value="${humidity}">
        Humidity: ${humidity}%
      </p>
      <p id="wind" data-value="${wind}">
        Wind: ${wind} m/s
      </p>
    </div>
  `;
}

function updateBackground(condition) {
  const body = document.body;
  body.className = "min-h-screen";

  if (condition.includes("rain")) {
    body.classList.add("bg-blue-900", "text-white");
  } else if (condition.includes("cloud")) {
    body.classList.add("bg-gray-400");
  } else if (condition.includes("clear")) {
    body.classList.add("bg-yellow-200");
  } else {
    body.classList.add("bg-gray-100");
  }
}
