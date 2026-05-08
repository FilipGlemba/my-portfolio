# Weather App

Responzívna weather aplikácia vytvorená ako súčasť môjho portfólia. Používateľ môže vyhľadať mesto, pozrieť aktuálne počasie, hodinovú predpoveď, 5-dňovú predpoveď, uložiť obľúbené mestá, prepnúť jednotky, tému aj jazyk.

## Demo

Live projekt: [Weather App](https://filipglemba.github.io/moje-portfolio/weather/)

## Funkcie

- Aktuálne počasie podľa názvu mesta alebo geolokácie
- Teplota, vlhkosť, vietor, tlak, viditeľnosť, oblačnosť, východ a západ slnka
- Hodinová predpoveď na najbližších 24 hodín
- Prehľadná 5-dňová predpoveď
- Autocomplete miest cez OpenWeatherMap Geocoding API
- Obľúbené mestá uložené v `localStorage`
- Prepnutie jednotiek medzi Celsius a Fahrenheit
- Svetlá a tmavá téma
- Slovenský a anglický jazyk
- Offline fallback pre posledné uložené počasie
- Responzívny layout pre mobil, tablet aj desktop

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- OpenWeatherMap API
- LocalStorage

## Štruktúra projektu

```text
weather/
|-- config.example.js
|-- index.html
|-- README.md
|-- script.js
`-- style.css
```

## Spustenie lokálne

1. Naklonuj repozitár:

```bash
git clone https://github.com/FilipGlemba/moje-portfolio.git
```

2. Otvor priečinok projektu:

```bash
cd moje-portfolio/weather
```

3. Skopíruj konfiguračný súbor:

```bash
copy config.example.js config.js
```

4. Do `config.js` vlož svoj OpenWeatherMap API kľúč:

```js
window.WEATHER_CONFIG = {
  OPENWEATHERMAP_API_KEY: 'tvoj_api_kľúč'
};
```

5. Otvor `index.html` v prehliadači.

## Bezpečnosť API kľúča

API kľúč sa nedá bezpečne skryť, ak je priamo v JavaScripte, ktorý sa posiela do prehliadača. Každý návštevník si vie otvoriť DevTools alebo zdrojový kód a kľúč skopírovať.

Preto je v tomto repozitári iba `config.example.js`. Skutočný `config.js` je pridaný v `.gitignore`, aby sa neposielal na GitHub.

Ak má aplikácia bežať verejne aj s tajným API kľúčom, najlepšie riešenie je backend alebo serverless proxy, napríklad Netlify Functions, Vercel Functions alebo vlastný Node/PHP endpoint. API kľúč potom zostane v serverovom `.env` súbore a frontend volá iba tvoj endpoint.

## API

Dáta o počasí poskytuje [OpenWeatherMap](https://openweathermap.org/). Na použitie live dát je potrebný bezplatný API kľúč.

## Čo som si precvičil

- Práca s externým API
- Renderovanie dát bez frameworku
- Správa UI stavov
- Ukladanie dát do `localStorage`
- Viacjazyčné texty v rozhraní
- Responzívny dizajn a polish UI

## Autor

Filip Glemba  
[GitHub](https://github.com/FilipGlemba)

## Licencia

Projekt slúži na portfolio a učenie.
