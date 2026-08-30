// Generated illustration used only for the two products where no relevant
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
    images: [placeholderImage("Backpack", "#0B0C0E", "#26292E")],
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
