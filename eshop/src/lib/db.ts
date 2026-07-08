import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI environment variable is required.");
}

const mongoUri = uri;

declare global {
  // eslint-disable-next-line no-var
  var _fitgear_mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

const cached = global._fitgear_mongoose || { conn: null, promise: null };

if (!global._fitgear_mongoose) {
  global._fitgear_mongoose = cached;
}

async function connect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(mongoUri, {
        connectTimeoutMS: 3000,
        serverSelectionTimeoutMS: 3000,
      })
      .then((mongooseInstance) => {
        cached.conn = mongooseInstance;
        return mongooseInstance;
      })
      .catch((error) => {
        cached.promise = null;
        throw error;
      });
  }

  return cached.promise;
}

export default connect;
