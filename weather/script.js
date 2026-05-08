// ─────────────────────────────────────────────
// CONFIG – vlož svoj OpenWeatherMap API kľúč
// https://openweathermap.org/api (zadarmo)
// ─────────────────────────────────────────────
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
const BASE    = 'https://api.openweathermap.org/data/2.5';
const GEO     = 'https://api.openweathermap.org/geo/1.0';
let lang      = localStorage.getItem('weather-lang') || 'sk';

const weatherTranslations = {
  sk: {
    placeholder: 'Hľadaj mesto...',
    emptyTitle: 'Aké je vonku počasie?',
    emptySub: 'Zadaj mesto alebo použi svoju polohu',
    favoritesTitle: 'Oblúbené mestá',
    noFavorites: 'Žiadne oblúbené mestá',
    errorNotFound: 'Mesto sa nenašlo',
    errorTry: 'Skús iný názov mesta',
    loading: 'Načítavam počasie...',
    hourlySection: '— NASLEDUJÚCICH 24 HODÍN',
    forecastSection: '— PREDPOVEĎ NA 5 DNÍ',
    locateBtn: 'Poloha',
    favoriteBtn: 'Pridať do oblúbených',
    favoriteBtnRemove: 'Odstrániť z obľúbených',
    portfolio: 'Portfolio',
    themeToggle: 'Prepnúť tému',
    langToggle: 'EN',
    langToggleTitle: 'Prepnúť jazyk',
    footerPrefix: 'Dáta:',
    openWeather: 'OpenWeatherMap',
    humidity: '💧 Vlhkosť',
    wind: '💨 Vietor',
    direction: '🧭 Smer',
    pressure: '🌡 Tlak',
    visibility: '👁 Viditeľnosť',
    clouds: '☁️ Oblačnosť',
    sunrise: '🌅 Východ',
    sunset: '🌇 Západ',
    locationBlocked: 'Prístup k polohe bol zamietnutý',
    geolocationUnsupported: 'Geolokácia nie je podporovaná',
    offline: 'Offline režim - staršie dáta',
    close: 'Zavrieť',
    serverError: 'Chyba servera',
    forecastError: 'Chyba predpovede'
  },
  en: {
    placeholder: 'Search city...',
    emptyTitle: 'What’s the weather like?',
    emptySub: 'Enter a city or use your location',
    favoritesTitle: 'Favorite cities',
    noFavorites: 'No favorite cities',
    errorNotFound: 'City not found',
    errorTry: 'Try another city name',
    loading: 'Loading weather...',
    close: 'Close',
    hourlySection: '— NEXT 24 HOURS',
    forecastSection: '— 5-DAY FORECAST',
    locateBtn: 'Location',
    favoriteBtn: 'Add to favorites',
    favoriteBtnRemove: 'Remove from favorites',
    portfolio: 'Portfolio',
    themeToggle: 'Toggle theme',
    langToggle: 'SK',
    langToggleTitle: 'Switch language',
    footerPrefix: 'Data:',
    openWeather: 'OpenWeatherMap',
    humidity: '💧 Humidity',
    wind: '💨 Wind',
    direction: '🧭 Direction',
    pressure: '🌡 Pressure',
    visibility: '👁 Visibility',
    clouds: '☁️ Clouds',
    sunrise: '🌅 Sunrise',
    sunset: '🌇 Sunset',
    locationBlocked: 'Location access denied',
    geolocationUnsupported: 'Geolocation is not supported',
    offline: 'Offline mode - older data',
    serverError: 'Server error',
    forecastError: 'Forecast error'

  }
};

// ─── State ───
let units       = 'metric';   // 'metric' | 'imperial'
let theme       = 'light';
let clockInt    = null;
let acTimer     = null;
let currentTz   = 0;
let userLocation = null;
let favorites   = JSON.parse(localStorage.getItem('weather-favorites') || '[]');
let cachedWeather = JSON.parse(localStorage.getItem('weather-cache') || 'null');

// ─── DOM ───
const cityInput     = document.getElementById('cityInput');
const searchBtn     = document.getElementById('searchBtn');
const locateBtn     = document.getElementById('locateBtn');
const unitToggle    = document.getElementById('unitToggle');
const themeToggle   = document.getElementById('themeToggle');
const autocomplete  = document.getElementById('autocomplete');
const emptyState    = document.getElementById('emptyState');
const errorState    = document.getElementById('errorState');
const errorMsg      = document.getElementById('errorMsg');
const loading       = document.getElementById('loading');
const weatherData   = document.getElementById('weatherData');

const locationName  = document.getElementById('locationName');
const locationCountry = document.getElementById('locationCountry');
const localTime     = document.getElementById('localTime');
const currentDate   = document.getElementById('currentDate');
const weatherIcon   = document.getElementById('weatherIcon');
const weatherDesc   = document.getElementById('weatherDesc');
const tempMain      = document.getElementById('tempMain');
const tempFeels     = document.getElementById('tempFeels');
const humidity      = document.getElementById('humidity');
const wind          = document.getElementById('wind');
const windDir       = document.getElementById('windDir');
const pressure      = document.getElementById('pressure');
const visibility    = document.getElementById('visibility');
const clouds        = document.getElementById('clouds');
const sunrise       = document.getElementById('sunrise');
const sunset        = document.getElementById('sunset');
const cardBg        = document.getElementById('cardBg');
const hourlyTrack   = document.getElementById('hourlyTrack');
const forecastGrid  = document.getElementById('forecastGrid');
const currentCard   = document.getElementById('currentCard');
const hourlySection = document.getElementById('hourlySection');
const forecastSection = document.getElementById('forecastSection');
const favoritesBtn    = document.getElementById('favoritesBtn');
const favoritesDropdown = document.getElementById('favoritesDropdown');
const favoritesClose  = document.getElementById('favoritesClose');
const favoritesList   = document.getElementById('favoritesList');
const favoriteBtn     = document.getElementById('favoriteBtn');
const langToggle      = document.getElementById('langToggle');
const portfolioBtn    = document.getElementById('portfolioBtn');
const favoritesTitle  = document.getElementById('favoritesTitle');
const emptyTitle      = document.getElementById('emptyTitle');
const emptySub        = document.getElementById('emptySub');
const errorSub        = document.getElementById('errorSub');
const loadingText     = document.getElementById('loadingText');
const hourlyHeading   = document.getElementById('hourlyHeading');
const forecastHeading = document.getElementById('forecastHeading');
const humidityLabel   = document.getElementById('humidityLabel');
const windLabel       = document.getElementById('windLabel');
const directionLabel  = document.getElementById('directionLabel');
const pressureLabel   = document.getElementById('pressureLabel');
const visibilityLabel = document.getElementById('visibilityLabel');
const cloudsLabel     = document.getElementById('cloudsLabel');
const sunriseLabel    = document.getElementById('sunriseLabel');
const sunsetLabel     = document.getElementById('sunsetLabel');
const footerPrefix    = document.getElementById('footerPrefix');

// ─── Helpers ───
function show(el) { el.classList.remove('hidden') }
function hide(el) { el.classList.add('hidden') }

function updateWeatherLanguage(selectedLang) {
  lang = selectedLang;
  localStorage.setItem('weather-lang', lang);
  document.documentElement.lang = lang;
  const t = weatherTranslations[lang];

  cityInput.placeholder = t.placeholder;
  locateBtn.querySelector('.ctrl-label').textContent = t.locateBtn;
  locateBtn.title = t.locateBtn;
  favoritesBtn.querySelector('.ctrl-label').textContent = t.favoritesTitle;
  favoritesBtn.title = t.favoritesTitle;
  favoritesClose.title = t.close;
  favoriteBtn.title = t.favoriteBtn;
  portfolioBtn.textContent = t.portfolio;
  portfolioBtn.title = t.portfolio;
  langToggle.textContent = t.langToggle;
  langToggle.title = t.langToggleTitle;
  themeToggle.title = t.themeToggle;
  favoritesTitle.textContent = t.favoritesTitle;
  emptyTitle.textContent = t.emptyTitle;
  emptySub.textContent = t.emptySub;
  errorSub.textContent = t.errorTry;
  loadingText.textContent = t.loading;
  hourlyHeading.textContent = t.hourlySection;
  forecastHeading.textContent = t.forecastSection;
  humidityLabel.textContent = t.humidity;
  windLabel.textContent = t.wind;
  directionLabel.textContent = t.direction;
  pressureLabel.textContent = t.pressure;
  visibilityLabel.textContent = t.visibility;
  cloudsLabel.textContent = t.clouds;
  sunriseLabel.textContent = t.sunrise;
  sunsetLabel.textContent = t.sunset;
  footerPrefix.textContent = t.footerPrefix;
}

function setState(state) {
  [emptyState, errorState, loading, weatherData].forEach(hide);
  if (state === 'empty')   show(emptyState);
  if (state === 'error')   show(errorState);
  if (state === 'loading') show(loading);
  if (state === 'data')    show(weatherData);
}

function iconUrl(code) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

function getDistanceKm(lat1, lon1, lat2, lon2) {
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Wind degrees → compass direction
function windDegToDir(deg) {
  const dirs = ['S','SV','V','JV','J','JZ','Z','SZ'];
  return dirs[Math.round(deg / 45) % 8];
}

// Format unix+tz → HH:MM
function fmtTime(unix, tz = 0) {
  const d = new Date((unix + tz) * 1000);
  const h = String(d.getUTCHours()).padStart(2, '0');
  const m = String(d.getUTCMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

// Format unix → day name short
function fmtDay(unix) {
  return ['Ned','Pon','Uto','Str','Štv','Pia','Sob'][new Date(unix * 1000).getDay()];
}

// Format unix+tz → "Pondelok\n12. jan"
function fmtDate(unix, tz = 0) {
  const d = new Date((unix + tz) * 1000);
  const days   = ['Nedeľa','Pondelok','Utorok','Streda','Štvrtok','Piatok','Sobota'];
  const months = ['jan','feb','mar','apr','máj','jún','júl','aug','sep','okt','nov','dec'];
  return `${days[d.getUTCDay()]}<br/>${d.getUTCDate()}. ${months[d.getUTCMonth()]}`;
}

// Day/night gradient based on local hour
function getTimeOfDay(unix, tz) {
  const localHour = new Date((unix + tz) * 1000).getUTCHours();
  if (localHour >= 5  && localHour < 8)  return 'dawn';
  if (localHour >= 8  && localHour < 19) return 'day';
  if (localHour >= 19 && localHour < 21) return 'dusk';
  return 'night';
}

// Live local clock
function startClock(tz) {
  clearInterval(clockInt);
  const tick = () => {
    const now = Math.floor(Date.now() / 1000);
    localTime.textContent = fmtTime(now, tz);
  };
  tick();
  clockInt = setInterval(tick, 1000);
}

// Reveal animation
function reveal(el, delay = 0) {
  el.classList.remove('in');
  el.style.transitionDelay = delay + 'ms';
  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('in')));
}

// Temperature unit
function displayTemp(celsius) {
  if (units === 'imperial') return `${Math.round(celsius * 9/5 + 32)}°F`;
  return `${Math.round(celsius)}°`;
}

// Speed unit
function displaySpeed(ms) {
  if (units === 'imperial') return `${Math.round(ms * 2.237)} mph`;
  return `${Math.round(ms * 3.6)} km/h`;
}

// ─── Fetch ───
async function fetchCurrent(query) {
  const qs = typeof query === 'string'
    ? `q=${encodeURIComponent(query)}`
    : `lat=${query.lat}&lon=${query.lon}`;
  const res = await fetch(`${BASE}/weather?${qs}&units=metric&lang=${lang}&appid=${API_KEY}`);
  if (!res.ok) throw new Error(res.status === 404 ? weatherTranslations[lang].errorNotFound : weatherTranslations[lang].serverError);
  return res.json();
}

async function fetchForecast(lat, lon) {
  const res = await fetch(`${BASE}/forecast?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${API_KEY}`);
  if (!res.ok) throw new Error(weatherTranslations[lang].forecastError);
  return res.json();
}

// Geocoding autocomplete
async function fetchGeo(q) {
  const res = await fetch(`${GEO}/direct?q=${encodeURIComponent(q)}&limit=5&appid=${API_KEY}`);
  if (!res.ok) return [];
  return res.json();
}

// ─── Render current ───
function renderCurrent(data) {
  const tz = data.timezone;
  currentTz = tz;

  locationName.textContent    = data.name;
  locationCountry.textContent = data.sys.country;
  currentDate.innerHTML       = fmtDate(data.dt, tz);
  weatherIcon.src             = iconUrl(data.weather[0].icon);
  weatherIcon.alt             = data.weather[0].description;
  weatherDesc.textContent     = data.weather[0].description;
  tempMain.textContent        = displayTemp(data.main.temp);
  tempFeels.textContent       = displayTemp(data.main.feels_like);
  humidity.textContent        = `${data.main.humidity}%`;
  wind.textContent            = displaySpeed(data.wind.speed);
  windDir.textContent         = data.wind.deg != null ? windDegToDir(data.wind.deg) : '—';
  pressure.textContent        = `${data.main.pressure} hPa`;
  visibility.textContent      = data.visibility ? `${(data.visibility / 1000).toFixed(1)} km` : '—';
  clouds.textContent          = `${data.clouds?.all ?? '—'}%`;
  sunrise.textContent         = fmtTime(data.sys.sunrise, tz);
  sunset.textContent          = fmtTime(data.sys.sunset, tz);

  // gradient strip
  const tod = getTimeOfDay(data.dt, tz);
  cardBg.className = `card-bg${tod !== 'day' ? ' ' + tod : ''}`;

  startClock(tz);
}

// ─── Render hourly (next 24h) ───
function renderHourly(list, tz) {
  hourlyTrack.innerHTML = list.slice(0, 8).map((item, i) => {
    const pop = Math.round((item.pop || 0) * 100);
    return `
      <div class="hourly-card${i === 0 ? ' now' : ''}">
        <div class="hourly-time">${i === 0 ? 'TERAZ' : fmtTime(item.dt, tz)}</div>
        <div class="hourly-icon">
          <img src="${iconUrl(item.weather[0].icon)}" alt=""/>
        </div>
        <div class="hourly-temp">${displayTemp(item.main.temp)}</div>
        <div class="hourly-pop${pop < 20 ? ' dry' : ''}">${pop >= 20 ? `💧 ${pop}%` : '—'}</div>
      </div>`;
  }).join('');
}

// ─── Render 5-day forecast ───
function renderForecast(list) {
  // group by day, pick entry closest to noon
  const map = {};
  for (const item of list) {
    const key  = new Date(item.dt * 1000).toDateString();
    const hour = new Date(item.dt * 1000).getUTCHours();
    if (!map[key] || Math.abs(hour - 12) < Math.abs(map[key].h - 12)) {
      map[key] = { item, h: hour };
    }
  }

  forecastGrid.innerHTML = Object.values(map).slice(0, 5).map(({ item }, i) => {
    const pop = Math.round((item.pop || 0) * 100);
    return `
      <div class="forecast-card" style="transition-delay:${i * 55}ms">
        <div class="forecast-day">${fmtDay(item.dt).toUpperCase()}</div>
        <div class="forecast-icon">
          <img src="${iconUrl(item.weather[0].icon)}" alt=""/>
        </div>
        <div class="forecast-desc">${item.weather[0].description}</div>
        <div class="forecast-pop${pop < 20 ? ' dry' : ''}">${pop >= 20 ? `💧 ${pop}%` : '—'}</div>
        <div class="forecast-temps">
          <span class="forecast-hi">${displayTemp(item.main.temp_max)}</span>
          <span class="forecast-lo">${displayTemp(item.main.temp_min)}</span>
        </div>
      </div>`;
  }).join('');
}

// ─── Load weather ───
async function loadWeather(query) {
  hideAutocomplete();
  setState('loading');
  try {
    const current  = await fetchCurrent(query);
    const forecast = await fetchForecast(current.coord.lat, current.coord.lon);

    renderCurrent(current);
    renderHourly(forecast.list, current.timezone);
    renderForecast(forecast.list);

    // Cache weather data
    cachedWeather = { current, forecast: forecast.list, timestamp: Date.now() };
    localStorage.setItem('weather-cache', JSON.stringify(cachedWeather));

    // Update favorite button
    updateFavoriteButton();

    setState('data');
    reveal(currentCard, 0);
    reveal(hourlySection, 90);
    reveal(forecastSection, 180);
  } catch (err) {
    // Try offline mode
    if (cachedWeather && navigator.onLine === false) {
      renderCachedWeather();
      setState('data');
      reveal(currentCard, 0);
      reveal(hourlySection, 90);
      reveal(forecastSection, 180);
      return;
    }
    errorMsg.textContent = err.message || weatherTranslations[lang].serverError;
    setState('error');
  }
}

// ─── Favorites ───
function isFavorited(name, country) {
  return favorites.some(f => f.name === name && f.country === country);
}

function addToFavorites(name, country, lat, lon) {
  if (isFavorited(name, country)) return;
  favorites.push({ name, country, lat, lon });
  localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  updateFavoriteButton();
  renderFavorites();
}

function removeFromFavorites(name, country) {
  favorites = favorites.filter(f => !(f.name === name && f.country === country));
  localStorage.setItem('weather-favorites', JSON.stringify(favorites));
  updateFavoriteButton();
  renderFavorites();
}

function updateFavoriteButton() {
  const name = locationName.textContent;
  const country = locationCountry.textContent;
  if (name !== '—' && country !== '—') {
    favoriteBtn.classList.toggle('favorited', isFavorited(name, country));
  }
}

function renderFavorites() {
  if (!favorites.length) {
    favoritesList.innerHTML = `<div class="favorites-empty">${weatherTranslations[lang].noFavorites}</div>`;
    return;
  }

  favoritesList.innerHTML = favorites.map(f => `
    <div class="favorites-item" data-lat="${f.lat}" data-lon="${f.lon}" data-name="${f.name}">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
      </svg>
      <div>
        <div class="favorites-item-name">${f.name}</div>
        <div class="favorites-item-country">${f.country}</div>
      </div>
      <button class="favorites-item-remove" data-name="${f.name}" data-country="${f.country}">×</button>
    </div>
  `).join('');

  // Event listeners
  favoritesList.querySelectorAll('.favorites-item').forEach(item => {
    item.addEventListener('click', (e) => {
      if (!e.target.classList.contains('favorites-item-remove')) {
        const lat = item.dataset.lat;
        const lon = item.dataset.lon;
        loadWeather({ lat: parseFloat(lat), lon: parseFloat(lon) });
        favoritesDropdown.classList.remove('open');
      }
    });
  });

  favoritesList.querySelectorAll('.favorites-item-remove').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const country = btn.dataset.country;
      removeFromFavorites(name, country);
    });
  });
}

// ─── Offline mode ───
function renderCachedWeather() {
  if (!cachedWeather) return;

  const { current, forecast } = cachedWeather;
  renderCurrent(current);
  renderHourly(forecast, current.timezone);
  renderForecast(forecast);
  updateFavoriteButton();

  // Show offline indicator
  const offlineMsg = document.createElement('div');
  offlineMsg.textContent = weatherTranslations[lang].offline;
  offlineMsg.style.cssText = 'position:fixed; top:10px; left:50%; transform:translateX(-50%); background:#f59e0b; color:#000; padding:8px 16px; border-radius:4px; font-size:12px; z-index:1000;';
  document.body.appendChild(offlineMsg);
  setTimeout(() => offlineMsg.remove(), 3000);
}
function hideAutocomplete() {
  autocomplete.classList.remove('open');
  autocomplete.innerHTML = '';
}

// Popular cities for suggestions when no query
const popularCities = [
  { name: 'Bratislava', lat: 48.1486, lon: 17.1077, country: 'SK' },
  { name: 'Košice', lat: 48.7164, lon: 21.2611, country: 'SK' },
  { name: 'Žilina', lat: 49.2232, lon: 18.7394, country: 'SK' },
  { name: 'Banská Bystrica', lat: 48.7363, lon: 19.1462, country: 'SK' },
  { name: 'Prešov', lat: 49.0000, lon: 21.2333, country: 'SK' },
  { name: 'Nitra', lat: 48.3076, lon: 18.0845, country: 'SK' },
  { name: 'Trnava', lat: 48.3774, lon: 17.5872, country: 'SK' },
  { name: 'Martin', lat: 49.0665, lon: 18.9238, country: 'SK' },
  { name: 'Trenčín', lat: 48.8945, lon: 18.0444, country: 'SK' },
  { name: 'Poprad', lat: 49.0614, lon: 20.2979, country: 'SK' },
  { name: 'Prague', lat: 50.0755, lon: 14.4378, country: 'CZ' },
  { name: 'Vienna', lat: 48.2082, lon: 16.3738, country: 'AT' },
  { name: 'Budapest', lat: 47.4979, lon: 19.0402, country: 'HU' },
  { name: 'Warsaw', lat: 52.2297, lon: 21.0122, country: 'PL' },
  { name: 'Berlin', lat: 52.5200, lon: 13.4050, country: 'DE' }
];

function showNearbySuggestions() {
  if (!userLocation) return;

  const sorted = popularCities.sort((a, b) => {
    const da = getDistanceKm(userLocation.lat, userLocation.lon, a.lat, a.lon);
    const db = getDistanceKm(userLocation.lat, userLocation.lon, b.lat, b.lon);
    return da - db;
  }).slice(0, 5);

  autocomplete.innerHTML = sorted.map(r => {
    const label = `${r.name}, ${r.country}`;
    return `
      <div class="ac-item" data-lat="${r.lat}" data-lon="${r.lon}" data-name="${r.name}">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
        </svg>
        ${label}
      </div>`;
  }).join('');

  autocomplete.classList.add('open');

  autocomplete.querySelectorAll('.ac-item').forEach(item => {
    item.addEventListener('click', () => {
      cityInput.value = item.dataset.name;
      loadWeather({ lat: item.dataset.lat, lon: item.dataset.lon });
      hideAutocomplete();
    });
  });
}

cityInput.addEventListener('input', () => {
  clearTimeout(acTimer);
  const val = cityInput.value.trim();
  if (val.length < 2) {
    if (val.length === 0 && userLocation) {
      showNearbySuggestions();
    } else {
      hideAutocomplete();
    }
    return;
  }

  acTimer = setTimeout(async () => {
    const results = await fetchGeo(val);
    if (!results.length) { hideAutocomplete(); return; }

    if (userLocation) {
      results.sort((a, b) => {
        const da = getDistanceKm(userLocation.lat, userLocation.lon, a.lat, a.lon);
        const db = getDistanceKm(userLocation.lat, userLocation.lon, b.lat, b.lon);
        return da - db;
      });
    }

    autocomplete.innerHTML = results.map(r => {
      const label = [r.name, r.state, r.country].filter(Boolean).join(', ');
      return `
        <div class="ac-item" data-lat="${r.lat}" data-lon="${r.lon}" data-name="${r.name}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
          </svg>
          ${label}
        </div>`;
    }).join('');

    autocomplete.classList.add('open');

    autocomplete.querySelectorAll('.ac-item').forEach(item => {
      item.addEventListener('click', () => {
        cityInput.value = item.dataset.name;
        loadWeather({ lat: item.dataset.lat, lon: item.dataset.lon });
        hideAutocomplete();
      });
    });
  }, 320);
});

cityInput.addEventListener('focus', () => {
  if (cityInput.value.trim() === '' && userLocation) {
    showNearbySuggestions();
  }
});

document.addEventListener('click', e => {
  if (!e.target.closest('.search-wrap')) hideAutocomplete();
});

// ─── Search ───
function handleSearch() {
  const val = cityInput.value.trim();
  if (!val) return;
  loadWeather(val);
  cityInput.blur();
}
searchBtn.addEventListener('click', handleSearch);
cityInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') handleSearch();
  if (e.key === 'Escape') hideAutocomplete();
});

// ─── Geolocation ───
locateBtn.addEventListener('click', () => {
  if (!navigator.geolocation) {
    errorMsg.textContent = weatherTranslations[lang].geolocationUnsupported;
    setState('error'); return;
  }
  setState('loading');
  navigator.geolocation.getCurrentPosition(
    pos => {
      userLocation = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      loadWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    },
    ()  => { errorMsg.textContent = weatherTranslations[lang].locationBlocked; setState('error'); }
  );
});

// ─── Unit toggle ───
unitToggle.addEventListener('click', () => {
  units = units === 'metric' ? 'imperial' : 'metric';
  unitToggle.textContent = units === 'metric' ? '°C' : '°F';
  unitToggle.classList.toggle('imperial', units === 'imperial');

  // re-render temps if data visible
  if (!weatherData.classList.contains('hidden')) {
    document.querySelectorAll('[id]').forEach(() => {});
    // simplest: just reload last query (state already loaded)
    // re-render from cached data would need storing data; reload is clean
    const name = locationName.textContent;
    if (name && name !== '—') loadWeather(name);
  }
});

// ─── Theme toggle ───
themeToggle.addEventListener('click', () => {
  theme = theme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('weather-theme', theme);
});

langToggle.addEventListener('click', () => {
  const nextLang = lang === 'sk' ? 'en' : 'sk';
  updateWeatherLanguage(nextLang);
  if (!weatherData.classList.contains('hidden')) {
    loadWeather(locationName.textContent);
  }
});

// ─── Persist theme ───
const savedTheme = localStorage.getItem('weather-theme');
if (savedTheme) {
  theme = savedTheme;
  document.documentElement.setAttribute('data-theme', theme);
}

updateWeatherLanguage(lang);

// ─── Favorites ───
favoritesBtn.addEventListener('click', () => {
  renderFavorites();
  favoritesDropdown.classList.add('open');
});

favoritesClose.addEventListener('click', () => {
  favoritesDropdown.classList.remove('open');
});

favoriteBtn.addEventListener('click', () => {
  const name = locationName.textContent;
  const country = locationCountry.textContent;
  if (name === '—' || country === '—') return;

  if (isFavorited(name, country)) {
    removeFromFavorites(name, country);
  } else {
    // Get coords from current data
    const currentData = cachedWeather?.current;
    if (currentData) {
      addToFavorites(name, country, currentData.coord.lat, currentData.coord.lon);
    }
  }
});

// ─── Init ───
setState('empty');
