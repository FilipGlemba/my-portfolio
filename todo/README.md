# ✅ TaskStudio

[![HTML5](https://img.shields.io/badge/-HTML5-E34F26?logo=html5&logoColor=white)]()
[![CSS3](https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)]()
[![LocalStorage](https://img.shields.io/badge/-LocalStorage-FFA500?logo=browser&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, feature-rich task manager built with vanilla HTML, CSS, and JavaScript. No frameworks, no dependencies—just solid frontend fundamentals and a polished user experience.

## 📝 Overview

TaskStudio is a **zero-dependency productivity tool** that lives in your browser. Create, organize, and track tasks with powerful filtering, sorting, and priority management. All data stays local—no cloud sync, no privacy concerns, no external dependencies.

### Key Qualities

- ⚡ **Zero dependencies** — Pure vanilla JavaScript
- 🔒 **Privacy-first** — All data stays in your browser
- 🎯 **Lightweight** — Single HTML file + CSS + JS
- 🌍 **Bilingual** — Slovak & English interface
- 🎨 **Beautiful** — Dark & light themes
- 📱 **Responsive** — Works on desktop, tablet, mobile

## ✨ Features

### Task Management

- ✅ Create, edit, complete, and delete tasks
- 🏷️ Assign priority levels (high, normal, low)
- 📅 Set due dates with visual indicators
- 📝 Add detailed notes to tasks
- ⏰ Quick "Today" view for daily focus

### Organization

- 🔍 Search tasks by title or notes
- 📊 Filter: All, Open, Today, Completed
- 📈 Sort: Custom order, Smart, Due date, Priority, Newest
- 🎯 Progress bar with completion stats

### User Experience

- 🖱️ Drag & drop task reordering
- ⚠️ Confirmation modals for destructive actions
- ⌨️ Keyboard-friendly controls
- 📱 Responsive design (mobile-first)

### Personalization

- 🌙 Dark & light theme toggle
- 🌍 SK/EN language switching
- 💾 LocalStorage auto-save
- 📥 Export tasks as JSON
- 📤 Import tasks from JSON backup

## 🛠️ Tech Stack

```
HTML5 • CSS3 • Vanilla JavaScript • LocalStorage • Responsive Design
```

### Architecture

- **No build step** — Just open and use
- **No dependencies** — 100% vanilla code
- **Single HTML file** — Easy to understand & modify
- **Modular CSS** — Clear component structure
- **State management** — Pure JavaScript objects
- **DOM rendering** — Direct manipulation from state

## 📁 Project Structure

```
todo/
├── index.html     # Complete HTML with semantic markup
├── style.css      # Responsive design (mobile-first)
├── script.js      # State management & DOM rendering
└── README.md      # This file
```

### HTML Structure

```html
<!-- Header with theme & language switchers -->
<!-- Input section for creating tasks -->
<!-- Filter & sort controls -->
<!-- Task list (rendered from JS state) -->
<!-- Stats bar -->
<!-- Import/export section -->
```

### CSS Organization

```css
/* Variables for theme colors */
/* Responsive breakpoints */
/* Layout: Grid & Flexbox */
/* Components: Tasks, buttons, modals */
/* Themes: Light & dark modes */
```

### JavaScript Architecture

```javascript
// State object (tasks, theme, language, filters)
// DOM references & cached elements
// Render functions (UI updates)
// Event handlers (user interactions)
// LocalStorage persistence
// Export/import functions
```

## 🚀 Getting Started

### Option 1: Open Directly

Simply double-click `todo/index.html` in your file explorer—it works immediately!

### Option 2: Use Local Server

For HTTPS features (like camera access) or simulating production:

```bash
# From repository root
git clone https://github.com/FilipGlemba/my-portfolio.git
cd my-portfolio

# Python 3
python -m http.server 8000

# Or Node.js
npx http-server

# Then visit
http://localhost:8000/todo/
```

### Option 3: Deploy Online

- Upload `todo/` folder to GitHub
- Enable GitHub Pages
- Share the live link!

## 💾 Data Storage

### LocalStorage

All data persists in your browser automatically:

- **Tasks** — Complete list with all properties
- **Theme** — Your color preference (light/dark)
- **Language** — Your chosen language (SK/EN)
- **Filters** — Last used view and sort order

### Export/Import

Manually backup or migrate data:

```bash
# Export → Download JSON file with all tasks
# Import → Upload JSON file to restore tasks
```

### Privacy

- ✅ No cloud sync
- ✅ No account required
- ✅ No tracking
- ✅ Data stays 100% local
- ✅ Browser's LocalStorage only (~5-10MB per site)

## 🎓 What This Project Demonstrates

### HTML & Semantics

- ✅ Semantic markup (header, main, section, article)
- ✅ Accessible form controls & ARIA labels
- ✅ Clean, readable structure

### CSS Mastery

- ✅ CSS Grid & Flexbox layouts
- ✅ Mobile-first responsive design
- ✅ CSS custom properties (variables)
- ✅ Theme switching without JavaScript libraries
- ✅ Smooth animations & transitions

### JavaScript Fundamentals

- ✅ Event handling & delegation
- ✅ DOM manipulation (create, read, update, delete)
- ✅ State management without Redux/Zustand
- ✅ LocalStorage API usage
- ✅ Drag & drop API
- ✅ JSON serialization/deserialization
- ✅ Modern ES6+ syntax

### User Experience

- ✅ Confirmation modals for destructive actions
- ✅ Real-time UI updates
- ✅ Keyboard accessibility
- ✅ Loading states & feedback
- ✅ Responsive mobile experience

## 📖 Code Quality

- **No external dependencies** — Every line of code is yours to learn from
- **Well-commented** — Easy to understand and modify
- **Modular functions** — Logical separation of concerns
- **Readable naming** — Clear variable and function names

## 🤝 Contributing

Want to add features? Fork, improve, and submit a PR!

## 📄 License

MIT License — Feel free to use in personal or commercial projects

## 👨‍💻 Author

**Filip Glemba**

- 🌐 Portfolio: [filip-glemba.sk](https://filip-glemba.sk)
- 🐙 GitHub: [@FilipGlemba](https://github.com/FilipGlemba)
