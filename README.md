# 🚀 Filip Glemba Portfolio

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Status: Active](https://img.shields.io/badge/Status-Active-green.svg)]()
[![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black)]()
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)]()
[![Next.js](https://img.shields.io/badge/-Next.js-000000?logo=next.js&logoColor=white)]()
[![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)]()

Personal web developer portfolio showcasing standalone projects with bilingual content, responsive design, and modern frontend practices.

## 📊 Projects at a Glance

| Project               | Type          | Key Features                                                                  |
| ---------------------- | ------------- | ------------------------------------------------------------------------------ |
| 🛍️ **FitGear E-shop** | Next.js Stack | E-commerce with auth, catalog, cart, Stripe checkout, orders, admin dashboard  |

The portfolio homepage (`index.html`) also showcases two additional projects — **Mozaika** (a band website) and an ongoing **client project** — that live in their own separate repositories and aren't included in this one.

## 📝 Overview

The main portfolio is a responsive HTML/CSS/JavaScript site presenting projects, technical expertise, experience, and contact information.

## 📁 Repository Structure

```
moje_portfolio/
├── index.html                 # Main portfolio homepage
├── assets/
│   ├── css/styles.css        # Portfolio styles
│   └── js/                   # Language switcher & navigation
└── eshop/                    # 🛍️ FitGear E-shop
    ├── package.json
    ├── src/
    ├── scripts/
    └── README.md
```

## 🛠️ Tech Stack

### Frontend (Portfolio)

```
HTML5 • CSS3 • Vanilla JavaScript • Responsive Design (Grid/Flexbox) • LocalStorage
```

### Backend & Services (E-shop)

```
Next.js 14 • TypeScript • React • Tailwind CSS • MongoDB • Mongoose
NextAuth • Stripe • Resend • Cloudinary • Zustand • Zod
```

### External APIs

```
Stripe • NextAuth • Cloudinary
```

## 🚀 Quick Start

### Portfolio (Static Site)

Open directly in browser:

```bash
open index.html
```

Or use a local server:

```bash
cd moje_portfolio
python -m http.server 8000
# Visit: http://localhost:8000
```

### FitGear E-shop

```bash
cd eshop
npm install
cp .env.example .env.local
# Fill in: MONGODB_URI, NEXTAUTH_SECRET, STRIPE_*, etc.
npm run dev
# Visit: http://localhost:3000
```

## 📚 Project Details

- [**FitGear E-shop**](./eshop/README.md) — Full-stack development, database design, payment processing

## 🌍 Live & Deploy

### Hosting Options

**Portfolio (Static)**

- GitHub Pages
- Netlify
- Vercel
- Any static host

**E-shop (Full-Stack)**

- Vercel (with MongoDB Atlas)
- Railway
- Heroku
- AWS / Azure

### Environment Setup

See [eshop/.env.example](./eshop/.env.example) for required variables:

```
MONGODB_URI
NEXTAUTH_SECRET
STRIPE_PUBLIC_KEY / STRIPE_SECRET_KEY
CLOUDINARY_*
RESEND_API_KEY
```

## 🎯 Features & Skills Demonstrated

### Portfolio Site

- ✅ Semantic HTML structure
- ✅ CSS Grid & Flexbox responsive layouts
- ✅ Bilingual interface (SK/EN) with JS switching
- ✅ Modern typography & design

### FitGear E-shop

- ✅ Full-stack application design
- ✅ Authentication & authorization
- ✅ Payment gateway integration (Stripe)
- ✅ Database schema design (MongoDB)
- ✅ File upload handling (Cloudinary)
- ✅ Email notifications (Resend)
- ✅ RESTful API design
- ✅ Admin dashboard & role-based access

## 📖 License

MIT License — See LICENSE file for details

## 🤝 Contributing

Feel free to fork, submit issues, and create pull requests. Feedback and contributions welcome!

## 📧 Contact

**Filip Glemba**

- 🐙 GitHub: [@FilipGlemba](https://github.com/FilipGlemba)

## Environment Notes

The e-shop uses environment variables for MongoDB, NextAuth, Stripe, Resend, and Cloudinary. See `eshop/.env.example` for the expected keys.

## What This Repository Demonstrates

- Clean static portfolio structure
- Responsive design across desktop, tablet, and mobile
- Bilingual UI content with JavaScript-based language switching
- LocalStorage persistence and client-side state handling
- External API integration
- Full-stack Next.js project structure

## Author

Filip Glemba
GitHub: [FilipGlemba](https://github.com/FilipGlemba)
