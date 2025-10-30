import { NextResponse } from "next/server";
import { createGroup, getGroupsByUser } from "@/lib/groupModels";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received group creation request:", body);

    const { name, description, createdBy, members } = body;

    if (!name || !createdBy || !members || !Array.isArray(members)) {
      console.log("Missing fields:", { name, createdBy, members });
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, createdBy, and members array are required",
        },
        { status: 400 }
      );
    }

    // Validate that all IDs are valid ObjectIds
    const invalidIds = members.filter((id) => !ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: "Invalid member IDs: " + invalidIds.join(", ") },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(createdBy)) {
      return NextResponse.json(
        { error: "Invalid createdBy user ID" },
        { status: 400 }
      );
    }

    const group = await createGroup({
      name: name.trim(),
      description: description?.trim() || "",
      createdBy: new ObjectId(createdBy),
      members: members.map((id) => new ObjectId(id)), // Convert all to ObjectId
    });

    console.log("Group created successfully:", group);
    return NextResponse.json(group, { status: 201 });
  } catch (error) {
    console.error("Failed to create group:", error);
    return NextResponse.json(
      { error: "Failed to create group: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    if (!ObjectId.isValid(userId)) {
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const groups = await getGroupsByUser(new ObjectId(userId));
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Failed to fetch groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}
