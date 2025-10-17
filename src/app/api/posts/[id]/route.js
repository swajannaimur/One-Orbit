import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("posts");
    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      return new Response(
        JSON.stringify({ success: false, message: "Post not found" }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Error fetching post by ID:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
