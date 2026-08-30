import path from "path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(path.resolve(__dirname, ".."));

import { hash } from "bcrypt";
import mongoose from "mongoose";
import Product from "../src/models/Product";
import User from "../src/models/User";
import { SEED_PRODUCTS, SEED_USERS } from "../src/lib/seed-data";

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to eshop/.env.local (see .env.example) before seeding.");
    process.exit(1);
  }

  console.log(`Connecting to ${uri}...`);
  await mongoose.connect(uri);

  await Product.deleteMany({});
  await User.deleteMany({});
  console.log("Cleared existing products and users.");

  const products = await Product.insertMany(SEED_PRODUCTS);
  console.log(`Created ${products.length} products.`);

  for (const seedUser of SEED_USERS) {
    await User.create({
      name: seedUser.name,
      email: seedUser.email,
      passwordHash: await hash(seedUser.password, 12),
      role: seedUser.role,
    });
    console.log(`Created ${seedUser.role} account: ${seedUser.email} / ${seedUser.password}`);
  }

  console.log("\nSeeding complete.");
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((error) => {
  console.error("Seeding failed:", error);
  process.exit(1);
});
