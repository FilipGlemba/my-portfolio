/*
  CONFIG.EXAMPLE.JS
  Verejna sablona konfiguracie pre weather aplikaciu.

  Pouzitie:
  1. Skopiruj tento subor ako config.js
  2. Do OPENWEATHERMAP_API_KEY vloz vlastny OpenWeatherMap API kluc
  3. config.js necommituj - je pridany v .gitignore

  Dovod:
  Frontendovy API kluc sa v prehliadaci neda skutocne skryt.
  Preto je realny lokalny config.js mimo Gitu a na GitHube je iba tato sablona.
*/
window.WEATHER_CONFIG = {
  OPENWEATHERMAP_API_KEY: 'YOUR_OPENWEATHERMAP_API_KEY'
};
