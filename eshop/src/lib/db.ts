import mongoose from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var _fitgear_mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global._fitgear_mongoose ?? { conn: null, promise: null };
if (!global._fitgear_mongoose) {
  global._fitgear_mongoose = cached;
}

async function resolveUri(): Promise<string> {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("MONGODB_URI environment variable is required.");
  }

  const { getDevMongoUri } = await import("@/lib/dev-mongo");
  return getDevMongoUri();
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = resolveUri()
      .then((uri) =>
        mongoose.connect(uri, {
          connectTimeoutMS: 5000,
          serverSelectionTimeoutMS: 5000,
        }),
      )
      .then(async (instance) => {
        cached.conn = instance;
        if (!process.env.MONGODB_URI) {
          const { seedIfEmpty } = await import("@/lib/dev-mongo");
          await seedIfEmpty();
        }
        return instance;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  return cached.promise;
}

export default connect;
