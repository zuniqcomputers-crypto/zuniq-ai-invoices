import mongoose from "mongoose";

// TEMPORARY: Hardcoded connection string to bypass env issues
const MONGODB_URI = "mongodb://zuniqstudio_db_user:J0IzM8gXvVxI4Utu@ac-cobaxxu-shard-00-00.s6mgrca.mongodb.net:27017,ac-cobaxxu-shard-00-01.s6mgrca.mongodb.net:27017,ac-cobaxxu-shard-00-02.s6mgrca.mongodb.net:27017/zuniq-invoices?ssl=true&replicaSet=atlas-eu9q5u-shard-0&authSource=admin&appName=Cluster0";

if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
