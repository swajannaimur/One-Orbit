import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { ObjectId } from "mongodb";

// GET all invites
export async function GET(req) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-invites");

    const invites = await collection
      .find({}, { projection: { __v: 0 } })
      .toArray();

    return new Response(JSON.stringify({ invites }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("GET /api/users/invite error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST create a new invite
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { inviteeEmail, role, expiresAt } = body;

    if (!inviteeEmail || !role || !expiresAt) {
      return new Response(JSON.stringify({ error: "Missing fields" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-invites");

    const result = await collection.insertOne({
      inviterEmail: session.user.email,
      inviteeEmail,
      role,
      status: "pending",
      createdAt: new Date(),
      expiresAt: new Date(expiresAt),
    });

    return new Response(JSON.stringify({ invite: result.insertedId }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("POST /api/users/invite error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// PATCH update invite status
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400, headers: { "Content-Type": "application/json" } });

    const body = await req.json();
    const { status } = body;
    if (!status) return new Response(JSON.stringify({ error: "Missing status" }), { status: 400, headers: { "Content-Type": "application/json" } });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("users-invites");

    const existing = await collection.findOne({ _id: new ObjectId(id) });
    if (!existing) return new Response(JSON.stringify({ error: "Not found" }), { status: 404, headers: { "Content-Type": "application/json" } });

    if (
  existing.inviterEmail !== session.user.email &&
  existing.inviteeEmail !== session.user.email
) {
  return new Response(JSON.stringify({ error: "Forbidden" }), { status: 403 });
}


    await collection.updateOne({ _id: new ObjectId(id) }, { $set: { status } });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("PATCH /api/users/invite/[id] error", err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}

// DELETE an invite
export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { "Content-Type": "application/json" } });
    }

    const id = params.id;
    if (!id) return new Response(JSON.stringify({ error: "Missing id" }), { status: 400, headers: { "Content-Type": "application/json" } });

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const existing = await db.collection('users-invites').findOne({ _id: new ObjectId(id) });
    if (!existing) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });

    if (existing.inviterEmail !== session.user.email) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: { 'Content-Type': 'application/json' } });
    }

    await db.collection('users-invites').deleteOne({ _id: new ObjectId(id) });

    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('DELETE /api/users/invite/[id] error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
