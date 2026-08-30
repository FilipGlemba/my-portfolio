// Generated illustration used only for the one product where no relevant
// free-licensed photo was found (see public/images/CREDITS.md).
function placeholderImage(label: string, from: string, to: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${from}" />
        <stop offset="100%" stop-color="${to}" />
      </linearGradient>
    </defs>
    <rect width="600" height="600" fill="url(#g)" />
    <circle cx="480" cy="120" r="180" fill="rgba(215,255,63,0.10)" />
    <circle cx="80" cy="520" r="140" fill="rgba(0,0,0,0.18)" />
    <text x="50%" y="52%" dominant-baseline="middle" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="800" letter-spacing="1" fill="rgba(255,255,255,0.95)">${label.toUpperCase()}</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

export type SeedProduct = {
  name: string;
  slug: string;
  description: string;
  price: number;
  category: "Training" | "Running" | "Recovery" | "Accessories";
  stock: number;
  images: string[];
  badge: "NEW" | "BESTSELLER" | "LIMITED" | "NONE";
  featured: boolean;
};

export const SEED_PRODUCTS: SeedProduct[] = [
  {
    name: "Velocity Pro Trainer",
    slug: "velocity-pro-trainer",
    description: "Lightweight training shoes engineered for speed, stability, and long-distance comfort.",
    price: 129.99,
    category: "Training",
    stock: 50,
    images: ["/images/products/velocity-pro-trainer.jpg"],
    badge: "NEW",
    featured: true,
  },
  {
    name: "Elite Running Shoe",
    slug: "elite-running-shoe",
    description: "Premium running shoes with responsive cushioning for marathon training.",
    price: 159.99,
    category: "Running",
    stock: 40,
    images: ["/images/products/elite-running-shoe.jpg"],
    badge: "BESTSELLER",
    featured: true,
  },
  {
    name: "Recovery Compression Sleeve",
    slug: "recovery-compression-sleeve",
    description: "High-performance compression wear for faster muscle recovery and injury prevention.",
    price: 49.99,
    category: "Recovery",
    stock: 100,
    images: ["/images/products/recovery-compression-sleeve.jpg"],
    badge: "NONE",
    featured: false,
  },
  {
    name: "Performance Training Backpack",
    slug: "performance-training-backpack",
    description: "Durable gym backpack with dedicated compartments for equipment and recovery essentials.",
    price: 89.99,
    category: "Accessories",
    stock: 30,
    images: ["/images/products/performance-training-backpack.jpg"],
    badge: "NONE",
    featured: false,
  },
  {
    name: "SwiftPace Running Watch",
    slug: "swiftpace-running-watch",
    description: "GPS running watch with heart rate monitor and workout tracking for serious athletes.",
    price: 199.99,
    category: "Accessories",
    stock: 25,
    images: ["/images/products/swiftpace-running-watch.jpg"],
    badge: "LIMITED",
    featured: false,
  },
  {
    name: "Momentum Strength Tee",
    slug: "momentum-strength-tee",
    description: "Breathable moisture-wicking tee built for heavy lifting days and high-rep circuits.",
    price: 34.99,
    category: "Training",
    stock: 80,
    images: [placeholderImage("Strength Tee", "#FF4433", "#C22417")],
    badge: "NONE",
    featured: false,
  },
  {
    name: "Trailblazer Off-Road Runner",
    slug: "trailblazer-off-road-runner",
    description: "Grip-heavy trail running shoes with reinforced toe protection for uneven terrain.",
    price: 174.99,
    category: "Running",
    stock: 35,
    images: ["/images/products/trailblazer-off-road-runner.jpg"],
    badge: "NEW",
    featured: true,
  },
  {
    name: "Restore Foam Roller",
    slug: "restore-foam-roller",
    description: "High-density foam roller for myofascial release and post-workout muscle recovery.",
    price: 27.99,
    category: "Recovery",
    stock: 60,
    images: ["/images/products/restore-foam-roller.jpg"],
    badge: "NONE",
    featured: false,
  },
  {
    name: "Grip Flow Yoga Mat",
    slug: "grip-flow-yoga-mat",
    description: "Non-slip 6mm mat with a textured surface that holds its grip through the sweatiest sessions.",
    price: 44.99,
    category: "Training",
    stock: 70,
    images: ["/images/products/yoga-mat.jpg"],
    badge: "NEW",
    featured: true,
  },
  {
    name: "Chalk Grip Training Gloves",
    slug: "chalk-grip-training-gloves",
    description: "Padded palm gloves with a reinforced grip zone for lifting, rowing, and pull-up work.",
    price: 24.99,
    category: "Training",
    stock: 90,
    images: ["/images/products/training-gloves.jpg"],
    badge: "NONE",
    featured: false,
  },
  {
    name: "QuickDry Gym Towel",
    slug: "quickdry-gym-towel",
    description: "Fast-absorbing microfiber towel that packs small and dries between sets, not after them.",
    price: 19.99,
    category: "Recovery",
    stock: 120,
    images: ["/images/products/gym-towel.jpg"],
    badge: "NONE",
    featured: false,
  },
  {
    name: "Circulate Compression Socks",
    slug: "circulate-compression-socks",
    description: "Graduated compression socks that ease leg fatigue on long runs and speed up recovery after.",
    price: 22.99,
    category: "Recovery",
    stock: 85,
    images: ["/images/products/compression-socks.jpg"],
    badge: "BESTSELLER",
    featured: false,
  },
  {
    name: "Momentum Performance Headband",
    slug: "momentum-performance-headband",
    description: "Sweat-wicking headband that stays put through sprints, sets, and everything between.",
    price: 14.99,
    category: "Accessories",
    stock: 100,
    images: ["/images/products/performance-headband.jpg"],
    badge: "NONE",
    featured: false,
  },
];

export const SEED_USERS = [
  { name: "Admin User", email: "admin@fitgear.local", password: "admin123", role: "admin" as const },
  { name: "Test User", email: "user@fitgear.local", password: "user123", role: "user" as const },
];

export const CATEGORY_IMAGES: Record<string, string> = {
  Training: "/images/categories/training.jpg",
  Running: "/images/categories/running.jpg",
  Recovery: "/images/categories/recovery.jpg",
  Accessories: "/images/categories/accessories.jpg",
};

// ─── Reviews ───

export type SeedReview = {
  productSlug: string;
  name: string;
  rating: number;
  comment: string;
  daysAgo: number;
};

const REVIEWERS = [
  "Jonas M.", "Priya K.", "Marek S.", "Aisha B.", "Tom H.", "Lucia P.",
  "Daniel R.", "Nina V.", "Oskar W.", "Ella F.", "Sam T.", "Zuzana K.",
];

const POSITIVE_COMMENTS = [
  "Exactly what I needed — noticed the difference within the first week.",
  "Better quality than I expected for the price. Would buy again.",
  "Held up well after a couple months of regular use.",
  "Fits great and doesn't feel cheap. Fast shipping too.",
  "My go-to now, replaced the one I'd been using for years.",
];

const MIXED_COMMENTS = [
  "Good overall, sizing ran a little different than I expected.",
  "Does the job, nothing extraordinary but no complaints either.",
  "Solid pick — took a few uses to break in properly.",
];

// Deterministic (not random) so re-seeding always produces the same data.
export function buildSeedReviews(): SeedReview[] {
  const reviews: SeedReview[] = [];
  SEED_PRODUCTS.forEach((product, productIndex) => {
    const count = 2 + (productIndex % 3); // 2-4 reviews per product
    for (let i = 0; i < count; i++) {
      const reviewerIndex = (productIndex * 3 + i) % REVIEWERS.length;
      const isMixed = i === count - 1 && productIndex % 4 === 0;
      const rating = isMixed ? 3 + (productIndex % 2) : 4 + ((productIndex + i) % 2);
      const pool = isMixed ? MIXED_COMMENTS : POSITIVE_COMMENTS;
      const comment = pool[(productIndex + i) % pool.length];
      reviews.push({
        productSlug: product.slug,
        name: REVIEWERS[reviewerIndex],
        rating,
        comment,
        daysAgo: 4 + productIndex * 5 + i * 11,
      });
    }
  });
  return reviews;
}
