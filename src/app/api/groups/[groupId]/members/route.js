import { NextResponse } from "next/server";
import { addMemberToGroup, getGroupById } from "@/lib/groupModels";
import { ObjectId } from "mongodb";

export async function POST(request, { params }) {
  try {
    const { groupId } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Validate ObjectIds
    if (!ObjectId.isValid(groupId)) {
      return NextResponse.json({ error: "Invalid group ID" }, { status: 400 });
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const result = await addMemberToGroup(
      new ObjectId(groupId),
      new ObjectId(userId)
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Get updated group
    const updatedGroup = await getGroupById(new ObjectId(groupId));

    return NextResponse.json(updatedGroup);
  } catch (error) {
    console.error("Failed to add member to group:", error);
    return NextResponse.json(
      { error: "Failed to add member" },
      { status: 500 }
    );
  }
}
