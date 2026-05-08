# Moje portfólio

Osobné portfólio web developera s moderným dizajnom, čistou štruktúrou a dvojjazyčnou podporou (SK / EN). Repozitár obsahuje hlavný portfolio web a samostatnú Weather aplikáciu priamo v priečinku `weather/`.

## 🚀 Čo je v repozitári

- `index.html` — hlavné portfolio so sekciou projektov
- `weather/index.html` — Weather app ako ukážka projektu v portfóliu
- `assets/` — štýly a skripty pre portfolio
- `weather/style.css`, `weather/script.js` — dizajn a logika počasia

## 🌐 Integrácia Weather app

Weather aplikácia je prepojená priamo z projektu v sekcii Projektov. Karta projektu teraz vedie na `weather/index.html` a súčasne je možné sa z aplikácie vrátiť späť do portfólia.

## 🛠️ Použité technológie

- HTML5
- CSS3
- JavaScript (ES6+)
- Vanilla JavaScript pre interakciu a viacjazyčnosť
- OpenWeather API pre počasie
- LocalStorage pre uložené obľúbené mestá a tému

## 📦 Spustenie lokálne

1. Klonuj repozitár:

   ```bash
   git clone https://github.com/FilipGlemba/moje-portfolio.git
   cd moje-portfolio
   ```

2. Otvor `index.html` pre portfólio alebo `weather/index.html` pre Weather aplikáciu.

3. Ak chceš používať lokálny server:

   ```bash
   python -m http.server 8000
   ```

   Potom navštív `http://localhost:8000`.

4. Pre Weather aplikáciu v `weather/script.js` si doplň vlastný OpenWeatherMap API kľúč.

## 📁 Štruktúra projektu

```
moje-portfolio/
├── index.html
├── README.md
├── assets/
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── main.js
│       ├── translations.js
│       └── language-switcher.js
└── weather/
    ├── index.html
    ├── README.md
    ├── script.js
    └── style.css
```

## 📞 Kontakt

Filip Glemba – [email](mailto:filip.glemba@example.com)

> Portfolio a Weather app sú pripravené na GitHub. Ak chceš, môžem pomôcť pridať aj GitHub Pages deploy alebo viac projektov.
