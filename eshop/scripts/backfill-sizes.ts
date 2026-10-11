// One-off, non-destructive migration: copies the size options from
// src/lib/seed-data.ts onto products that already exist in the database
// (e.g. the live MongoDB Atlas one), without wiping anything like `npm run seed` does.
//
//   npm run backfill:sizes        (uses MONGODB_URI from .env.local)
import path from "path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(path.resolve(__dirname, ".."));

import mongoose from "mongoose";
import Product from "../src/models/Product";
import { SEED_PRODUCTS } from "../src/lib/seed-data";

async function backfill() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to eshop/.env.local before running this.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  for (const product of SEED_PRODUCTS) {
    if (!product.sizes?.length) continue;
    const result = await Product.updateOne({ slug: product.slug }, { $set: { sizes: product.sizes } });
    const status = result.matchedCount === 0 ? "not in DB, skipped" : result.modifiedCount ? "updated" : "already up to date";
    console.log(`${product.slug.padEnd(32)} ${product.sizes.join(", ").padEnd(26)} ${status}`);
  }
  await mongoose.disconnect();
}

backfill().catch((error) => {
  console.error("Backfill failed:", error);
  process.exit(1);
});
