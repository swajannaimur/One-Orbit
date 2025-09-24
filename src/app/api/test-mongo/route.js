import clientPromise from "../../../../lib/mongodb";

export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db("AuthMongoNext");

    const collections = await db.listCollections().toArray();

    return new Response(JSON.stringify({
      message: "MongoDB connected!",
      collections: collections.map(c => c.collectionName),
      uri: process.env.MONGODB_URL // uri will be shown here

    }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({
      message: "MongoDB connection failed",
      error: error.message
    }), { status: 500 });
  }
}
