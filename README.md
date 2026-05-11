# My Portfolio

Personal web developer portfolio with a modern design, clean structure, and bilingual support (SK / EN). This repository contains the main portfolio website and a standalone Weather App in the `weather/` directory.

## What Is Included

- `index.html` - main portfolio with a projects section
- `weather/index.html` - Weather App included as a portfolio project
- `assets/` - styles and scripts for the portfolio
- `weather/style.css`, `weather/script.js` - weather app design and logic

## Weather App Integration

The Weather App is linked directly from the Projects section of the portfolio. The project card opens `weather/index.html`, and the app also includes navigation back to the portfolio.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Vanilla JavaScript for interaction and multilingual support
- OpenWeather API for weather data
- LocalStorage for saved favorite cities and theme preferences

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/FilipGlemba/moje-portfolio.git
   cd moje-portfolio
   ```

2. Open `index.html` for the portfolio or `weather/index.html` for the Weather App.

3. To use a local server:

   ```bash
   python -m http.server 8000
   ```

   Then visit `http://localhost:8000`.

4. For the Weather App, copy `weather/config.example.js` to `weather/config.js` and add your own OpenWeatherMap API key.

## Project Structure

```text
moje-portfolio/
|-- index.html
|-- README.md
|-- assets/
|   |-- css/
|   |   `-- styles.css
|   `-- js/
|       |-- main.js
|       |-- translations.js
|       `-- language-switcher.js
`-- weather/
    |-- index.html
    |-- README.md
    |-- config.example.js
    |-- script.js
    `-- style.css
```

## Contact

Filip Glemba - [email](mailto:filip.glemba@example.com)

> The portfolio and Weather App are ready for GitHub. Future improvements could include GitHub Pages deployment details or additional portfolio projects.
