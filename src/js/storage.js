const STORAGE_KEY = "recentCities";

export function getRecentCities() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveCity(city) {
  let cities = getRecentCities();

  city = city.trim();

  if (!cities.includes(city)) {
    cities.unshift(city);
  }

  if (cities.length > 5) {
    cities.pop();
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(cities));
}
