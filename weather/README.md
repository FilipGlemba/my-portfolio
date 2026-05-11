# Weather App

A responsive weather application built as part of my portfolio. Users can search for a city, view current weather, see an hourly forecast, check a 5-day forecast, save favorite cities, switch units, change the theme, and choose the interface language.

## Demo

Live project: [Weather App](https://filipglemba.github.io/moje-portfolio/weather/)

## Features

- Current weather by city name or geolocation
- Temperature, humidity, wind, pressure, visibility, cloud coverage, sunrise, and sunset
- Hourly forecast for the next 24 hours
- Clear 5-day forecast
- City autocomplete through the OpenWeatherMap Geocoding API
- Favorite cities saved in `localStorage`
- Unit switching between Celsius and Fahrenheit
- Light and dark theme
- Slovak and English language support
- Offline fallback for the last saved weather data
- Responsive layout for mobile, tablet, and desktop

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- OpenWeatherMap API
- LocalStorage

## Project Structure

```text
weather/
|-- config.example.js
|-- index.html
|-- README.md
|-- script.js
`-- style.css
```

## Run Locally

1. Clone the repository:

```bash
git clone https://github.com/FilipGlemba/moje-portfolio.git
```

2. Open the project folder:

```bash
cd moje-portfolio/weather
```

3. Copy the example configuration file:

```bash
copy config.example.js config.js
```

4. Add your OpenWeatherMap API key to `config.js`:

```js
window.WEATHER_CONFIG = {
  OPENWEATHERMAP_API_KEY: 'your_api_key'
};
```

5. Open `index.html` in your browser.

## API Key Security

An API key cannot be safely hidden when it is placed directly in JavaScript that is sent to the browser. Any visitor can open DevTools or the source code and copy the key.

That is why this repository only includes `config.example.js`. The real `config.js` file is listed in `.gitignore` so it is not pushed to GitHub.

If the application needs to run publicly with a private API key, the best solution is a backend or serverless proxy, such as Netlify Functions, Vercel Functions, or a custom Node/PHP endpoint. The API key can then stay in a server-side `.env` file, while the frontend calls only your endpoint.

## API

Weather data is provided by [OpenWeatherMap](https://openweathermap.org/). A free API key is required to use live data.

## What I Practiced

- Working with an external API
- Rendering data without a framework
- Managing UI states
- Saving data in `localStorage`
- Multilingual interface text
- Responsive design and UI polish

## Author

Filip Glemba  
[GitHub](https://github.com/FilipGlemba)

## License

This project is intended for portfolio and learning purposes.
