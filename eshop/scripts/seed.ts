import { hash } from "bcrypt";
import connect from "../src/lib/db";
import Product from "../src/models/Product";
import User from "../src/models/User";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: MongoMemoryServer;

const PRODUCTS = [
  {
    name: "Velocity Pro Trainer",
    slug: "velocity-pro-trainer",
    description: "Lightweight training shoes engineered for speed, stability, and long-distance comfort.",
    price: 129.99,
    category: "Training",
    stock: 50,
    badge: "NEW",
    featured: true,
    images: ["https://via.placeholder.com/500x500?text=Velocity+Pro"],
  },
  {
    name: "Elite Running Shoe",
    slug: "elite-running-shoe",
    description: "Premium running shoes with responsive cushioning for marathon training.",
    price: 159.99,
    category: "Running",
    stock: 40,
    badge: "BESTSELLER",
    featured: true,
    images: ["https://via.placeholder.com/500x500?text=Elite+Running"],
  },
  {
    name: "Recovery Compression Sleeve",
    slug: "recovery-compression-sleeve",
    description: "High-performance compression wear for faster muscle recovery and injury prevention.",
    price: 49.99,
    category: "Recovery",
    stock: 100,
    badge: "NONE",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Compression"],
  },
  {
    name: "Performance Training Backpack",
    slug: "performance-training-backpack",
    description: "Durable gym backpack with dedicated compartments for equipment and recovery essentials.",
    price: 89.99,
    category: "Accessories",
    stock: 30,
    badge: "NONE",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Backpack"],
  },
  {
    name: "SwiftPace Running Watch",
    slug: "swiftpace-running-watch",
    description: "GPS running watch with heart rate monitor and workout tracking for serious athletes.",
    price: 199.99,
    category: "Accessories",
    stock: 25,
    badge: "LIMITED",
    featured: false,
    images: ["https://via.placeholder.com/500x500?text=Watch"],
  },
];

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Try to connect to real MongoDB first, fallback to in-memory
    let connectionString = process.env.MONGODB_URI;
    if (!connectionString || connectionString.includes("localhost")) {
      try {
        console.log("📦 Starting in-memory MongoDB for testing...");
        mongoServer = await MongoMemoryServer.create();
        connectionString = mongoServer.getUri();
        process.env.MONGODB_URI = connectionString;
        console.log("✓ In-memory MongoDB started");
      } catch (error) {
        console.error("⚠ Could not start in-memory MongoDB, using MONGODB_URI from env");
      }
    }

    await connect();
    console.log("✓ Connected to database");

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});
    console.log("✓ Cleared existing data");

    // Seed products
    const products = await Product.insertMany(PRODUCTS);
    console.log(`✓ Created ${products.length} products`);

    // Seed admin user
    const adminPassword = await hash("admin123", 10);
    const admin = await User.create({
      name: "Admin User",
      email: "admin@fitgear.local",
      passwordHash: adminPassword,
      role: "admin",
    });
    console.log(`✓ Created admin user: admin@fitgear.local / admin123`);

    // Seed test user
    const userPassword = await hash("user123", 10);
    const testUser = await User.create({
      name: "Test User",
      email: "user@fitgear.local",
      passwordHash: userPassword,
      role: "user",
    });
    console.log(`✓ Created test user: user@fitgear.local / user123`);

    console.log("\n✅ Database seeded successfully!\n");
    console.log("Test credentials:");
    console.log("  Admin: admin@fitgear.local / admin123");
    console.log("  User:  user@fitgear.local / user123\n");

    if (mongoServer) {
      await mongoServer.stop();
    }
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    if (mongoServer) {
      await mongoServer.stop();
    }
    process.exit(1);
  }
}

seed();

