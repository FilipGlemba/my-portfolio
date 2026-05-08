# Weather App

A responsive weather application built as part of my web developer portfolio. It lets users search for a city, check current weather conditions, view hourly and 5-day forecasts, save favorite locations, switch units, and use light or dark mode.

## Demo

Live project: [Weather App](https://filipglemba.github.io/moje-portfolio/weather/)

## Features

- Current weather by city name or geolocation
- Temperature, humidity, wind, pressure, visibility, cloud coverage, sunrise, and sunset
- Hourly forecast for the next 24 hours
- 5-day forecast overview
- City autocomplete using the OpenWeatherMap Geocoding API
- Favorite cities saved in `localStorage`
- Celsius and Fahrenheit unit switch
- Light and dark theme
- Slovak and English language switch
- Offline fallback for the last cached weather data
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
|-- index.html
|-- README.md
|-- script.js
`-- style.css
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/FilipGlemba/moje-portfolio.git
```

2. Open the project folder:

```bash
cd moje-portfolio/weather
```

3. Add your OpenWeatherMap API key in `script.js`:

```js
const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY';
```

4. Open `index.html` in your browser.

## API

Weather data is provided by [OpenWeatherMap](https://openweathermap.org/). You need a free API key from OpenWeatherMap to run the app with live data.

Because this is a frontend-only project, the API key is visible in the browser. For production use, restrict the key in your OpenWeatherMap account or route requests through a backend.

## What I Practiced

- Fetching and rendering external API data
- Managing UI state without a framework
- Working with browser storage
- Building multilingual UI text
- Designing a responsive, polished project page

## Author

Filip Glemba  
[GitHub](https://github.com/FilipGlemba)

## License

This project is open for learning and portfolio review.
