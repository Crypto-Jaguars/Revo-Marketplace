import type { Mongoose } from 'mongoose';

declare global {
  var _mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  } | undefined;
}

export {};