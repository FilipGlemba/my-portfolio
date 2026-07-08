# FitGear - E-Commerce Platform

Modern Next.js e-commerce application with Stripe checkout, MongoDB, NextAuth authentication, and admin dashboard.

## 🚀 Quick Start

### Option 1: MongoDB Atlas (Recommended for Production)

1. **Create MongoDB Atlas Account**
   - Visit [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for free account
   - Create a free tier cluster

2. **Get Connection String**
   - Go to "Database" → "Connect"
   - Choose "Drivers" option
   - Copy the connection string

3. **Update Environment**

   ```bash
   # Copy .env.example to .env.local
   cp .env.example .env.local

   # Add your MongoDB Atlas connection string
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/fitgear?retryWrites=true
   ```

4. **Install Dependencies & Run**

   ```bash
   npm install
   npm run dev
   ```

5. **Access Admin**
   - Navigate to http://localhost:3000/login
   - Create your account or use:
     - Demo: user@example.com / password123

---

### Option 2: Local Development (Docker)

**Prerequisites:** Docker installed

```bash
# Start MongoDB container
docker-compose up -d

# Update .env.local
MONGODB_URI=mongodb://fitgear:fitgear123@localhost:27017/fitgear?authSource=admin

# Install and run
npm install
npm run dev
```

---

### Option 3: In-Memory Database (Testing Only)

```bash
# Setup in-memory MongoDB with test data
node scripts/dev-setup.js

# Run dev server
npm run dev
```

**Test Credentials:**

- Admin: `admin@fitgear.local` / `admin123`
- User: `user@fitgear.local` / `user123`

---

## 📋 Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Required
MONGODB_URI=mongodb://...
NEXTAUTH_SECRET=your-secret-key

# Optional (for full features)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
RESEND_API_KEY=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

---

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server (port 3000)
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run seed       # Seed database with test data
```

---

## 📁 Project Structure

```
eshop/
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components
│   ├── lib/           # Utilities (auth, db, stripe, etc.)
│   ├── models/        # Mongoose schemas
│   └── store/         # Zustand state management
├── scripts/           # Setup and seed scripts
├── public/            # Static assets
└── docker-compose.yml # MongoDB container config
```

---

## 🔐 Features

- ✅ User authentication (NextAuth v4)
- ✅ Product catalog with filtering
- ✅ Shopping cart (Zustand state)
- ✅ Stripe checkout integration
- ✅ Order management system
- ✅ Admin dashboard
- ✅ Product management (CRUD)
- ✅ Responsive design (Tailwind CSS)
- ✅ TypeScript strict mode

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

Ensure these are set in your hosting platform:

- `MONGODB_URI` - MongoDB Atlas connection
- `NEXTAUTH_SECRET` - Random secure string
- `STRIPE_SECRET_KEY`, `GOOGLE_CLIENT_ID`, etc.

---

## 📝 Development Notes

- **Database**: Uses Mongoose with TypeScript
- **Auth**: NextAuth v4 with credentials & Google OAuth
- **Payments**: Stripe checkout sessions
- **Email**: Resend for transactional emails
- **State**: Zustand for client-side state
- **Styling**: Tailwind CSS + custom CSS modules

---

## 🆘 Troubleshooting

**MongoDB connection errors?**

- Check `MONGODB_URI` is correct in `.env.local`
- For Atlas, ensure IP whitelist includes your IP (or 0.0.0.0 for development)

**Port 3000 already in use?**

```bash
npm run dev -- -p 3001
```

**Build errors?**

```bash
rm -rf .next
npm run build
```

---

## 📄 License

MIT - Feel free to use this project for personal or commercial use.

---

## 🤝 Contributing

This is a personal portfolio project. To extend it:

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

---

**Ready to get started?** Follow the Quick Start section above! 🎉
