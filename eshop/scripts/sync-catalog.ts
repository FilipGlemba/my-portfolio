// One-off, non-destructive migration: brings products that already exist in
// the database (e.g. the live MongoDB Atlas one) in line with
// src/lib/seed-data.ts, without wiping anything like `npm run seed` does.
//
//   - copies size options onto products that have none yet
//   - replaces generated SVG placeholder images (data: URIs) with the real
//     photo; images uploaded through the admin are never touched
//
//   npm run sync:catalog        (uses MONGODB_URI from .env.local)
import path from "path";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(path.resolve(__dirname, ".."));

import mongoose from "mongoose";
import Product from "../src/models/Product";
import { SEED_PRODUCTS } from "../src/lib/seed-data";

async function sync() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not set. Add it to eshop/.env.local before running this.");
    process.exit(1);
  }

  await mongoose.connect(uri);
  for (const seed of SEED_PRODUCTS) {
    const product = await Product.findOne({ slug: seed.slug });
    if (!product) {
      console.log(`${seed.slug.padEnd(32)} not in DB, skipped`);
      continue;
    }

    const changes: string[] = [];
    if (seed.sizes?.length && !product.sizes?.length) {
      product.sizes = seed.sizes;
      changes.push("sizes");
    }
    const onlyPlaceholders = product.images.length > 0 && product.images.every((src: string) => src.startsWith("data:"));
    if (onlyPlaceholders && !seed.images.some((src) => src.startsWith("data:"))) {
      product.images = seed.images;
      changes.push("images");
    }

    if (changes.length) await product.save();
    console.log(`${seed.slug.padEnd(32)} ${changes.length ? `updated ${changes.join(" + ")}` : "already up to date"}`);
  }
  await mongoose.disconnect();
}

sync().catch((error) => {
  console.error("Sync failed:", error);
  process.exit(1);
});
