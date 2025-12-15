export function renderCurrentWeather(data) {
  const container = document.getElementById("currentWeather");

  const temp = Math.round(data.main.temp);
  const humidity = data.main.humidity;
  const wind = data.wind.speed;
  const condition = data.weather[0].main.toLowerCase();
  const city = data.name;

  container.innerHTML = `
    <div class="bg-white p-4 rounded shadow">
      <h2 class="text-xl font-semibold mb-2">${city}</h2>
      <p class="text-3xl font-bold mb-2">${temp}°C</p>
      <p class="capitalize mb-1">Condition: ${condition}</p>
      <p>Humidity: ${humidity}%</p>
      <p>Wind: ${wind} m/s</p>
    </div>
  `;

  container.classList.remove("hidden");
  updateBackground(condition);
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
