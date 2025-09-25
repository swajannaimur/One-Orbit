import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// No options needed for driver v4+
const options = {};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable so that the value is preserved across hot reloads in dev mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
