import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PATCH = async (req, { params }) => {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("assigned");

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ success: false, error: "Missing status" });
    }

    const mongoId = ObjectId.isValid(id) ? new ObjectId(id) : id;

    const result = await collection.updateOne(
      { _id: mongoId },
      { $set: { status } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ success: false, message: "No project updated" });
    }

    return NextResponse.json({ success: true, message: "Status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
