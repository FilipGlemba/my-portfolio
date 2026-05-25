# TaskStudio - To-do App

TaskStudio is a polished browser-based to-do app built as a portfolio project. It focuses on clean UI, practical task management, responsive design, and client-side persistence without any backend.

## Overview

The app lets users plan daily work, track progress, organize priorities, reorder tasks, and save everything locally in the browser. It was built with vanilla HTML, CSS, and JavaScript to show strong fundamentals without relying on a framework.

## Features

- Create, edit, complete, and delete tasks
- Add due dates, notes, and priority levels
- Search tasks by title or notes
- Filter tasks by all, open, today, and done
- Sort by custom order, smart sort, due date, priority, or newest
- Drag and drop tasks to save a custom order
- Confirm modal before deleting tasks or clearing completed tasks
- Progress statistics and completion bar
- Light and dark theme
- Slovak and English interface
- LocalStorage persistence
- JSON export and import
- Responsive layout for desktop, tablet, and mobile

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- LocalStorage

## Project Structure

```text
todo/
|-- index.html   # App markup, controls, modal, and task template
|-- style.css    # Visual system, responsive layout, and component states
|-- script.js    # State management, rendering, filters, drag and drop, storage
`-- README.md    # Project documentation
```

## Run Locally

Clone the repository and open the app file in a browser:

```bash
git clone https://github.com/FilipGlemba/my-portfolio.git
cd my-portfolio
```

Then open:

```text
todo/index.html
```

You can also run a simple local server from the repository root:

```bash
python -m http.server 8000
```

Then visit:

```text
http://localhost:8000/todo/
```

## What This Project Demonstrates

- Clean semantic HTML structure
- Responsive CSS layout with a custom design system
- DOM rendering from structured JavaScript state
- Persistent client-side data with LocalStorage
- Accessible controls, labels, and modal behavior
- Practical UI interactions such as drag and drop, filtering, sorting, and import/export

## Author

Filip Glemba  
[GitHub](https://github.com/FilipGlemba)
