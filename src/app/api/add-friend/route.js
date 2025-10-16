import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


export async function POST(request) {
  try {
    const body = await request.json();
    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-data");

    const result = await collection.updateOne({_id: new ObjectId(senderId)}, {$push: {friends: receiverId}});

    console.log(result)
    return NextResponse.json("Friend added", { status: 201, result });
  } catch (error) {
    console.error("Failed to add friend", error);
    return NextResponse.json(
      { error: "Failed to add friend" },
      { status: 500 }
    );
  }
}
