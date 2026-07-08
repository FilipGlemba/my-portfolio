# 🌦️ Weather App

[![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)]()
[![OpenWeatherMap API](https://img.shields.io/badge/-OpenWeatherMap-FF9900?logo=openweathermap&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A beautiful, responsive weather dashboard built with vanilla JavaScript and OpenWeatherMap API. Search cities, view forecasts, save favorites, and switch between themes—all with a polished user experience.

## 📋 Overview

A **single-page weather application** that gives you real-time weather data, hourly updates, and 5-day forecasts for any city in the world. No sign-up required—just search and go!

### User Features

- 🔍 Search any city worldwide
- 📍 Auto-detect location with geolocation API
- ⭐ Save favorite cities
- 🌡️ Switch between Celsius & Fahrenheit
- 🌙 Dark & light themes
- 🌍 SK/EN language support
- 📡 Offline cache of last weather data
- ☁️ Detailed weather metrics (humidity, wind, pressure, visibility)

## ✨ Features

### Current Weather

- 🌡️ Temperature, "feels like", min/max
- 💧 Humidity level
- 💨 Wind speed & direction
- 🧭 Air pressure
- 👀 Visibility distance
- ☁️ Cloud coverage
- 🌅 Sunrise & sunset times
- 🌤️ Weather condition with icon

### Forecasts

- ⏰ Hourly forecast (next 24 hours)
- 📅 5-day daily forecast
- 📊 Visual weather icons & descriptions

### Convenience

- ⭐ Save favorite cities
- 📍 Auto-detect your location
- 🌡️ Celsius ↔ Fahrenheit toggle
- 🌙 Dark/light theme
- 🌍 Slovak & English interface
- 💾 Offline cache (last successful response)

### User Experience

- ✅ Fast, responsive interface
- ⌨️ Keyboard navigation
- 📱 Mobile-optimized design
- 🔄 Auto-refresh weather

## 🛠️ Tech Stack

```
HTML5 • CSS3 • Vanilla JavaScript • OpenWeatherMap API • LocalStorage • Responsive Design
```

### Key APIs Used

- **Geolocation API** — Detect user location
- **Fetch API** — Get weather data
- **LocalStorage** — Save preferences & cache
- **OpenWeatherMap** — Current & forecast data

## 📁 Project Structure

```
weather/
├── index.html        # HTML structure & layout
├── style.css         # Responsive design & themes
├── script.js         # Logic: API calls, state, rendering
├── config.example.js # API key template (copy & customize)
└── README.md         # This file
```

## 🚀 Getting Started

### Step 1: Get Your API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Go to API Keys section
4. Copy your key

### Step 2: Set Up Project

```bash
# Clone repository
git clone https://github.com/FilipGlemba/my-portfolio.git
cd my-portfolio/weather

# Create config file from template
copy config.example.js config.js
```

### Step 3: Add API Key

Edit `config.js`:

```javascript
window.WEATHER_CONFIG = {
  OPENWEATHERMAP_API_KEY: "your_api_key_here",
};
```

### Step 4: Run Locally

**Option A: Direct (simple)**

```bash
# Just open index.html in your browser
open index.html
```

**Option B: Local Server (recommended)**

```bash
# From repository root
python -m http.server 8000
# Visit: http://localhost:8000/weather/
```

### Step 5: Deploy Online

1. Fork to GitHub
2. Add your API key to environment (see security notes)
3. Deploy to GitHub Pages, Netlify, or Vercel
4. Share the link!

## 🔐 Security: API Key Management

### The Problem

Browser JavaScript is visible to users—API keys in client-side code are exposed. This is a known limitation of client-side weather apps.

### Current Approach (Local Development)

- ✅ `config.example.js` is committed to git
- ✅ `config.js` is in `.gitignore` (local only)
- ✅ Safe for personal/learning projects

### For Production

If deploying publicly, use a **backend proxy**:

```javascript
// Browser makes request to your backend
fetch("/api/weather?city=London")
  .then((res) => res.json())
  .then((data) => renderWeather(data));

// Your backend proxies to OpenWeatherMap with secret key
app.get("/api/weather", (req, res) => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY; // server-side secret
  fetch(`https://api.openweathermap.org/...?appid=${apiKey}`)
    .then((res) => res.json())
    .then((data) => res.json(data));
});
```

### Free Tier Limits

- **OpenWeatherMap Free**: 1,000 calls/day
- Monitor usage in account dashboard
- Upgrade if needed

## 🎓 What This Project Demonstrates

### API Integration

- ✅ REST API consumption with fetch()
- ✅ Async/await patterns
- ✅ Error handling & fallbacks
- ✅ API response caching
- ✅ Request debouncing (search)

### Browser APIs

- ✅ Geolocation API
- ✅ LocalStorage for persistence
- ✅ Fetch API with error handling
- ✅ DOM manipulation

### Frontend Skills

- ✅ Responsive design (mobile-first)
- ✅ CSS Grid & Flexbox layouts
- ✅ CSS custom properties (theming)
- ✅ Event handling & delegation
- ✅ Dynamic HTML rendering
- ✅ State management (vanilla JS)

### UX Considerations

- ✅ Loading states & spinners
- ✅ Error messages & recovery
- ✅ Offline fallback
- ✅ User preference persistence
- ✅ Accessible, keyboard-friendly UI

## 🤝 Contributing

Ideas? Found a bug? Submit issues or pull requests!

## 📄 License

MIT License — Use freely in personal or commercial projects

## 👨‍💻 Author

**Filip Glemba**

- 🌐 Portfolio: [filip-glemba.sk](https://filip-glemba.sk)
- 💼 LinkedIn: [linkedin.com/in/filipglemba](https://linkedin.com/in/filipglemba)
- 🐙 GitHub: [@FilipGlemba](https://github.com/FilipGlemba)
