# 🛍️ FitGear E-shop

[![Next.js](https://img.shields.io/badge/-Next.js_14-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)]()
[![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=stripe&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A full-stack e-commerce storefront built with Next.js 14, TypeScript, MongoDB, and Stripe. Runs with **zero setup** — no Docker, no database account, no API keys required to try it locally.

## 📋 Overview

FitGear is a sports & performance gear store demonstrating a complete full-stack flow: product catalog, authentication, cart, checkout, order history, and an admin dashboard.

### For customers

- 🔍 Browse, search, filter and sort a 13-product catalog across 4 categories
- 📦 Product detail pages with an image gallery, size/quantity selection, ratings, and reviews
- 🔁 "You might also like" recommendations from the same category
- 🛒 Persistent shopping cart (Zustand)
- 💳 Stripe Checkout for payment
- 👤 Email/password (and optional Google) authentication
- 📜 Order history on the account page
- 📧 Order confirmation emails (via Resend, optional)

### For admins

- 📊 Dashboard with revenue, daily orders, and real best-sellers
- ➕ Create, edit, and delete products, with drag-and-drop image upload straight to Cloudinary (optional — returns a clear error instead of a broken uploader if unconfigured)
- 📋 View orders and update their status
- 🔒 Protected by both middleware (edge) and per-route session checks

## 🎨 Design

Bold, dark "sporty" theme — Anton display type, a flame/volt accent palette, Framer Motion throughout (hero entrance, scroll reveals, page transitions, hover/tap micro-interactions). Product and category photography is real, freely-licensed photos downloaded locally (not hotlinked) — see [public/images/CREDITS.md](./public/images/CREDITS.md) for source/author/license per image and where to find the originals to re-edit.

## 🚀 Quick start (zero config)

```bash
cd eshop
npm install
npm run dev
```

Open **http://localhost:3000**. That's it — no `.env.local` required.

On first request, the app automatically starts an in-memory MongoDB and seeds it with demo products and two test accounts:

| Role  | Email                | Password   |
| ----- | --------------------- | ---------- |
| Admin | `admin@fitgear.local` | `admin123` |
| User  | `user@fitgear.local`  | `user123`  |

This in-memory database resets every time the dev server restarts — perfect for a quick look, not for anything you want to keep.

## 🗄️ Using a persistent database (optional)

Set `MONGODB_URI` in `.env.local` (copy from `.env.example`) to use a real database instead of the automatic in-memory one:

```bash
# Local, via Docker Compose
docker compose up -d
# MONGODB_URI=mongodb://fitgear:fitgear123@localhost:27017/fitgear?authSource=admin

# or MongoDB Atlas (free tier)
# MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fitgear
```

Then seed it once:

```bash
npm run seed
```

## ⚙️ Optional integrations

These features degrade gracefully — the rest of the app works fine without them, and each one returns a clear error only when actually used:

| Feature                     | Env vars                                                          | Without it                          |
| ---------------------------- | ------------------------------------------------------------------ | ------------------------------------ |
| Stripe checkout               | `STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` | Checkout returns a clear error       |
| Order confirmation emails     | `RESEND_API_KEY`                                                  | Order is still recorded, no email    |
| Cloudinary signed uploads     | `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | `/api/upload` returns a clear error |
| Google sign-in                | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_GOOGLE_LOGIN_ENABLED=true` | Credentials login only        |

See [.env.example](./.env.example) for the full list.

## 🛠️ Tech stack

| Layer        | Technology                                  |
| ------------ | -------------------------------------------- |
| Frontend     | React 18, TypeScript, Tailwind CSS, Zustand, Framer Motion |
| Framework    | Next.js 14 (App Router, Route Handlers, next/image) |
| Database     | MongoDB + Mongoose                            |
| Auth         | NextAuth.js (Credentials, optional Google)    |
| Payments     | Stripe Checkout                               |
| Email        | Resend                                        |
| Validation   | Zod                                           |
| Security     | bcrypt password hashing, edge middleware, per-route session checks |

## 📁 Project structure

```
eshop/
├── src/
│   ├── app/                # Routes: storefront, auth, checkout, admin, API
│   ├── components/         # React components
│   ├── lib/                # db, dev-mongo (auto local DB), queries, auth, stripe, resend, cloudinary...
│   ├── models/              # Mongoose schemas (User, Product, Order)
│   ├── store/               # Zustand cart store
│   └── middleware.ts        # Edge-level /admin protection
├── scripts/seed.ts          # Seed a real (Docker/Atlas) database
├── docker-compose.yml        # Optional local MongoDB
└── .env.example
```

## 🧪 Scripts

```bash
npm run dev        # Start dev server (auto in-memory DB if MONGODB_URI unset)
npm run build       # Production build
npm run start        # Start production server
npm run lint          # ESLint
npm run typecheck      # TypeScript --noEmit
npm run seed            # Seed a real database with demo data
```

### Test payment

With real Stripe test keys configured, use Stripe's test card `4242 4242 4242 4242`, any future expiry, any CVC.

## 🔐 Notes on the auth/admin design

- Sessions are JWT-based (NextAuth Credentials provider), with `role` (`user`/`admin`) embedded in the token.
- `/admin/**` is protected twice: at the edge by `src/middleware.ts` (redirects unauthenticated/non-admin visitors to `/login`), and again in each admin page/API route via `getServerSession`, so a direct API call can't bypass the check.
- Admin Server Components query MongoDB directly (no self-referential HTTP fetch), which avoids the classic Next.js pitfall where a server-side `fetch()` to your own API route doesn't forward the visitor's session cookie.

## 📄 License

MIT License — see [LICENSE](../LICENSE)

## 👨‍💻 Author

**Filip Glemba**

- GitHub: [@FilipGlemba](https://github.com/FilipGlemba)
