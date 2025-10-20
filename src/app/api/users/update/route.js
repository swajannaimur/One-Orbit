
import { getServerSession } from "next-auth";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
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

    const body = await req.json();
    const {
      name,
      bio,
      about,
      skills,
      portfolio,
      resume,
      github,
      linkedin,
      facebook,
      theme,
      notifications,
      image,
      qna,
    } = body;

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const updateDoc = {
      $set: {
        name: name ?? session.user.name,
        bio: bio ?? null,
        about: about ?? null,
        skills: Array.isArray(skills) ? skills : [],
        portfolio: portfolio ?? null,
        resume: resume ?? null,
        github: github ?? null,
        linkedin: linkedin ?? null,
        facebook: facebook ?? null,
        image: image ?? session.user.image,
        preferences: {
          theme: theme || "light",
          notifications: !!notifications,
           
        },
        qna: qna ?? {},
        updatedAt: new Date(),
      },
    };

    const result = await db
      .collection("users-data")
      .findOneAndUpdate(
        { email: session.user.email },
        updateDoc,
        {
          returnDocument: "after",
          projection: { password: 0 },
        }
      );

    return new Response(
      JSON.stringify({ user: result.value }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("/api/users/update error", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
