import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";
import crypto from "crypto";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const invites = await db
      .collection("users-invites")
      .find({ inviterEmail: session.user.email })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify({ invites }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/users/invite GET error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

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
    const { email: inviteeEmail, role = "member", message = "" } = body;

    if (!inviteeEmail || typeof inviteeEmail !== "string") {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const invite = {
      inviterEmail: session.user.email,
      inviterName: session.user.name || null,
      inviteeEmail,
      role,
      message,
      token,
      status: "pending",
      createdAt: new Date(),
      expiresAt,
    };

    await db.collection("users-invites").insertOne(invite);

    // NOTE: sending email is out-of-scope here. The token is returned so dev can test.

    return new Response(JSON.stringify({ invite }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/users/invite POST error", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
