


import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    // Fetch user, exclude password
    const user = await db
      .collection("users-data")
      .findOne(
        { email: session.user.email },
        { projection: { password: 0 } }
      );

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Ensure default values for optional fields
    const safeUser = {
      name: user.name || session.user.name || "",
      email: user.email || session.user.email || "",
      image: user.image || session.user.image || "",
      bio: user.bio || "",
      about: user.about || "",
      skills: Array.isArray(user.skills) ? user.skills : [],
      github: user.github || "",
      linkedin: user.linkedin || "",
      facebook: user.facebook || "",
      portfolio: user.portfolio || "",
      resume: user.resume || "",
      qna: user.qna || {},
    };

    return new Response(JSON.stringify({ user: safeUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("/api/users/me error", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

