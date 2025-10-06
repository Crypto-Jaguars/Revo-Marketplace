import mongoose, { type ConnectOptions } from 'mongoose';

// Typed cache interface to match global.d.ts
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

async function connectDB(): Promise<typeof mongoose> {
  // Environment check inside the function
  if (process.env.NODE_ENV === 'test' || process.env.CI) {
    throw new Error('Database connection disabled in test/CI environment');
  }

  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    throw new Error('Missing MONGODB_URI in env');
  }

  // Cache connection to avoid multiple connections in dev
  let cached = global._mongoose;
  if (!cached) {
    cached = global._mongoose = { conn: null, promise: null };
  }

  // Return existing connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Create connection promise if not exists
  if (!cached.promise) {
    const opts: ConnectOptions = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts);
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
