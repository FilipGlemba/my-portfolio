# 🛍️ FitGear E-shop

[![Next.js](https://img.shields.io/badge/-Next.js_14-000000?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)]()
[![MongoDB](https://img.shields.io/badge/-MongoDB-47A248?logo=mongodb&logoColor=white)]()
[![Stripe](https://img.shields.io/badge/-Stripe-008CDD?logo=stripe&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready full-stack e-commerce platform built with modern tech. Complete with user authentication, product catalog, shopping cart, Stripe integration, order management, and an admin dashboard.

## 📋 Overview

FitGear is a **sports & performance gear e-commerce store** built to demonstrate full-stack capabilities. Customers can browse, search, filter, and purchase products with a secure checkout flow. Orders are tracked with status updates, and admin users manage inventory and fulfillment through a protected dashboard.

### For Customers

- 🔍 Browse & search product catalog
- 🏷️ Filter by category, price, and properties
- 📦 View detailed product information
- 🛒 Manage shopping cart with Zustand
- 💳 Secure Stripe checkout
- 👤 Create account & manage profile
- 📜 View order history & status
- 📧 Order confirmation emails

### For Admin

- 📊 Dashboard with sales statistics
- ➕ Create, edit, and delete products
- 🖼️ Upload images via Cloudinary
- 📋 Manage orders & update status
- 👥 View customers & accounts

## 🛠️ Tech Stack

| Layer             | Technology                                  |
| ----------------- | ------------------------------------------- |
| **Frontend**      | React 18, TypeScript, Tailwind CSS, Zustand |
| **Framework**     | Next.js 14 (App Router, API Routes)         |
| **Database**      | MongoDB + Mongoose ODM                      |
| **Auth**          | NextAuth.js (Credentials, OAuth)            |
| **Payments**      | Stripe API                                  |
| **Files**         | Cloudinary (image upload)                   |
| **Email**         | Resend                                      |
| **Validation**    | Zod                                         |
| **Security**      | bcrypt (password hashing)                   |
| **Rate Limiting** | Custom middleware                           |
| **UI**            | Responsive Tailwind + React Components      |

## 📁 Project Structure

```
eshop/
├── src/
│   ├── app/
│   │   ├── api/                    # API routes (auth, products, orders, checkout)
│   │   ├── admin/                  # Admin dashboard pages
│   │   ├── account/                # User account & profile
│   │   ├── auth/                   # Login & register pages
│   │   ├── products/               # Product catalog & details
│   │   ├── cart/                   # Shopping cart
│   │   ├── checkout/               # Checkout flow
│   │   ├── collections/            # Category pages
│   │   ├── order-success/          # Success confirmation
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Homepage
│   ├── components/                 # Reusable React components
│   ├── lib/                        # Utilities (auth, db, stripe, validation, etc.)
│   ├── models/                     # MongoDB schemas (User, Product, Order)
│   └── store/                      # Zustand cart store
├── scripts/
│   ├── dev-setup.js               # Initial setup helper
│   └── seed.ts                    # Database seeding
├── public/                        # Static files
├── .env.example                   # Environment template
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- Stripe account
- Cloudinary account
- Resend email account (optional)

### Installation

1. **Install dependencies:**

   ```bash
   cd eshop
   npm install
   ```

2. **Create environment file:**

   ```bash
   cp .env.example .env.local
   ```

3. **Configure environment variables** (see details below)

4. **Start development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   ```
   http://localhost:3000
   ```

## ⚙️ Environment Variables

Create `.env.local` with the following (copy from `.env.example`):

### Database

```bash
# MongoDB connection string
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/fitgear?retryWrites=true&w=majority
```

### Authentication

```bash
# NextAuth secret (generate: openssl rand -base64 32)
NEXTAUTH_SECRET=your_secret_here
NEXTAUTH_URL=http://localhost:3000  # prod: https://yourdomain.com
```

### Payment (Stripe)

```bash
STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### File Upload (Cloudinary)

```bash
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Email (Resend)

```bash
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=noreply@fitgear.com
```

## 📚 API Endpoints

### Authentication

```
POST   /api/auth/register        Create new account
POST   /api/auth/login           (handled by NextAuth)
POST   /api/auth/change-password Change user password
GET    /api/auth/profile         Get current user profile
```

### Products

```
GET    /api/products             List all products
GET    /api/products/[slug]      Get product details
```

### Cart & Orders

```
POST   /api/checkout             Create checkout session
GET    /api/orders               List user's orders
GET    /api/orders/[id]          Get order details
PUT    /api/orders/[id]/status   Update order status (admin)
```

### Admin

```
GET    /api/admin/stats          Dashboard statistics
POST   /api/products             Create product
PUT    /api/products/[slug]      Update product
DELETE /api/products/[slug]      Delete product
```

## 🧪 Testing

### Test Account

Use provided seed data or create your own account via registration.

### Test Payment

Use Stripe's test card:

```
4242 4242 4242 4242
Exp: 12/25  CVC: 123
```

## 📦 Deployment

### Vercel (Recommended)

```bash
# 1. Push to GitHub
git push origin main

# 2. Connect repo to Vercel at vercel.com

# 3. Add environment variables in Vercel dashboard

# 4. Deploy (automatic on push)
```

### Other Platforms

- **Railway** — Connect GitHub, set env vars, deploy
- **Render** — Similar to Railway
- **Heroku** — May need Procfile

### Important for Production

- [ ] Set `NEXTAUTH_URL` to your domain
- [ ] Use production Stripe keys
- [ ] Configure MongoDB Atlas IP whitelist
- [ ] Enable HTTPS
- [ ] Set up error logging (Sentry, LogRocket)
- [ ] Configure CORS for API

## 🏛️ Key Features Explained

### Cart Management (Zustand)

Client-side cart store persisted to browser. Products, quantities, totals:

```typescript
const { addToCart, removeFromCart, cart } = useCart();
```

### Authentication (NextAuth)

Supports email/password and optional Google OAuth:

```typescript
const session = await getServerSession();
```

### Database (MongoDB + Mongoose)

Schemas for User, Product, Order with validation:

```typescript
const product = await Product.findBySlug(slug);
```

### Payments (Stripe)

Secure checkout flow with webhook handling:

```typescript
const session = await stripe.checkout.sessions.create(...);
```

### Image Upload (Cloudinary)

Cloudinary integration for product images:

```typescript
const uploadedUrl = await uploadToCloudinary(file);
```

## 🐛 Troubleshooting

### MongoDB Connection Failed

- Check connection string in `.env.local`
- Whitelist your IP in MongoDB Atlas
- Verify credentials are correct

### Stripe Errors

- Ensure keys are from same Stripe account
- Check webhook secret configuration
- Verify webhook endpoint is accessible

### Environment Variables Not Loading

- Restart dev server after `.env.local` changes
- Check for typos in variable names
- Ensure `.env.local` is in root (not src/)

## 📚 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [MongoDB Docs](https://docs.mongodb.com)
- [Stripe Integration Guide](https://stripe.com/docs/payments)
- [NextAuth.js Guide](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Author

**Filip Glemba**

- GitHub: [@FilipGlemba](https://github.com/FilipGlemba)
- Portfolio: [filip-glemba.sk](https://filip-glemba.sk)
