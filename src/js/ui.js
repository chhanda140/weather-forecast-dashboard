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

/* =======================
   5-DAY FORECAST UI
======================= */
export function renderFiveDayForecast(data) {
  const container = document.getElementById("forecastContainer");
  if (!container) return;

  container.innerHTML = "";

  // OpenWeatherMap gives data every 3 hours
  // Take one forecast per day (around noon)
  const dailyForecast = data.list.filter(item =>
    item.dt_txt.includes("12:00:00")
  );

  dailyForecast.forEach(day => {
    const date = new Date(day.dt_txt).toDateString();
    const temp = Math.round(day.main.temp);
    const wind = day.wind.speed;
    const humidity = day.main.humidity;
    const icon = day.weather[0].icon;

    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow text-center";

    card.innerHTML = `
      <h3 class="font-semibold mb-2">${date}</h3>
      <img
        src="https://openweathermap.org/img/wn/${icon}@2x.png"
        alt="weather icon"
        class="mx-auto"
      />
      <p class="font-bold">${temp}°C</p>
      <p class="text-sm">Wind: ${wind} m/s</p>
      <p class="text-sm">Humidity: ${humidity}%</p>
    `;

    container.appendChild(card);
  });
}
