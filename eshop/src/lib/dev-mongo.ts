// Dev-only convenience: spins up an in-memory MongoDB so the app runs with
// zero external setup (no Docker, no Atlas account). Only ever imported from
// db.ts when MONGODB_URI is unset and NODE_ENV !== "production".

declare global {
  // eslint-disable-next-line no-var
  var _fitgear_dev_mongo: { uri: string } | undefined;
}

export async function getDevMongoUri(): Promise<string> {
  if (global._fitgear_dev_mongo) {
    return global._fitgear_dev_mongo.uri;
  }

  const { MongoMemoryServer } = await import("mongodb-memory-server");
  const server = await MongoMemoryServer.create({ instance: { dbName: "fitgear" } });
  const uri = server.getUri("fitgear");
  global._fitgear_dev_mongo = { uri };

  console.log("\n[fitgear] No MONGODB_URI set - using a temporary in-memory MongoDB for this dev session.");
  console.log("[fitgear] Data resets on restart. Set MONGODB_URI in .env.local for a persistent database.\n");

  return uri;
}

export async function seedIfEmpty() {
  const { default: Product } = await import("@/models/Product");
  const { default: User } = await import("@/models/User");

  const existing = await Product.estimatedDocumentCount();
  if (existing > 0) return;

  const { hash } = await import("bcrypt");
  const { SEED_PRODUCTS, SEED_USERS } = await import("@/lib/seed-data");

  await Product.insertMany(SEED_PRODUCTS);
  await Promise.all(
    SEED_USERS.map(async (user) =>
      User.create({
        name: user.name,
        email: user.email,
        passwordHash: await hash(user.password, 10),
        role: user.role,
      }),
    ),
  );

  console.log(
    `[fitgear] Seeded ${SEED_PRODUCTS.length} products and ${SEED_USERS.length} test accounts (admin@fitgear.local / admin123, user@fitgear.local / user123).`,
  );
}
