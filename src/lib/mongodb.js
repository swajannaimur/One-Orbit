import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Use a global variable so that the value is preserved across hot reloads in dev mode
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri); // no options needed
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, always create a new client
  client = new MongoClient(uri); // removed 'options' because it's undefined
  clientPromise = client.connect();
}

export default clientPromise;
