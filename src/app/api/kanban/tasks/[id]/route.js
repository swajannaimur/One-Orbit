import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const task = await db.collection("tasks").findOne({ _id: new ObjectId(id) });
    if (!task)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ task }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const body = await req.json();
    const update = {};
    if (body.title !== undefined) update.title = body.title;
    if (body.description !== undefined) update.description = body.description;
    if (body.status !== undefined) update.status = body.status;
    update.updatedAt = new Date();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const res = await db
      .collection("tasks")
      .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: update }, { returnDocument: "after" });
    if (!res.value)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ task: res.value }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] PUT error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email)
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });

    const { id } = params;
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const res = await db.collection("tasks").deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0)
      return new Response(JSON.stringify({ error: "Not found" }), { status: 404 });
    return new Response(JSON.stringify({ success: true }), { headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("/api/kanban/tasks/[id] DELETE error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

