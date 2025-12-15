const STORAGE_KEY = "recentCities";

export function getRecentCities() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

export function saveCity(city) {
  let cities = getRecentCities();

  if (!cities.includes(city)) {
    cities.unshift(city);
  }

  if (cities.length > 5) {
    cities.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}
